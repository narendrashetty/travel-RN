import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Text,
    Dimensions,
    UIManager,
    InteractionManager,
} from 'react-native';
import PropTypes from 'prop-types';

import { Transitioner, addNavigationHelpers } from 'react-navigation';
import SharedItems from './SharedItems';

export default class MaterialSharedElementTransitioner extends Component {

  static childContextTypes = {
    registerSharedView: PropTypes.func,
    unregisterSharedView: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      sharedItems: new SharedItems(),
      itemsToMeasure: [],
    }
  }

  shouldComponentUpdate(nextProps, nextState: State) {
      /*
        state / prop changes
        - navigation change: nextProps !== this.props                       => true
        - onLayout: state: itemsToMeasure, sharedItems.metrics              => measured?
        - afterInteraction: state: itemsToMeasure, sharedElements.metrics   => false
        - register: state.sharedElements, state.itemsToMeasure              => false
        - unregister: statee.sharedElements                                 => false
      */
      return this.props !== nextProps || nextState.itemsToMeasure.length === 0;
  }

  setSharedItemsState(fun, callback) {
      this.setState((prevState) => (
          { sharedItems: fun(prevState) }
      ), callback);
  }
  addSharedItem(sharedItem) {
      this.setSharedItemsState(prevState =>
          prevState.sharedItems.add(sharedItem)
      );
  }
  removeSharedItem(name, containerRouteName) {
      this.setSharedItemsState(prevState =>
          prevState.sharedItems.remove(name, containerRouteName)
      );
  }
  getChildContext() {
      const self = this;
      return {
          registerSharedView(sharedItem) {
              self.addSharedItem(sharedItem);
              const {name, containerRouteName} = sharedItem;

              const matchingItem = self.state.sharedItems.findMatchByName(name, containerRouteName);
              // schedule to measure (on layout) if another view with the same name is mounted
              if (matchingItem) {
                  self.setState((prevState: State) => ({
                      sharedItems: prevState.sharedItems,
                      itemsToMeasure: [...prevState.itemsToMeasure, sharedItem, matchingItem]
                  }));
              }
          },
          unregisterSharedView(name, containerRouteName) {
              self.removeSharedItem(name, containerRouteName);
          },
      };
  }

  measure(sharedItem) {
    return new Promise((resolve, reject) => {
      UIManager.measureInWindow(
        sharedItem.nativeHandle,
        (x, y, width, height) => {
            resolve({ x, y, width, height });
        }
      );
    });
  }

  async _onLayout() {
    let toUpdate = [];
    for (let item of this.state.itemsToMeasure) {
      const { name, containerRouteName } = item;
      const metrics = await this.measure(item);
      toUpdate.push({ name, containerRouteName, metrics });
    }
    if (toUpdate.length > 0) {
      // console.log('measured, setting meatured state:', toUpdate)
      this.setState((prevState) => ({
        sharedItems: prevState.sharedItems.updateMetrics(toUpdate),
        itemsToMeasure: [],
      }));
    }
  }

  _configureTransition() {
    return {
      duration: 600,
      // useNativeDriver: false,
    }
  }

  _getChildNavigation = (scene) => {
      if (!this._childNavigationProps) this._childNavigationProps = {};
      let navigation = this._childNavigationProps[scene.key];
      if (!navigation || navigation.state !== scene.route) {
          navigation = this._childNavigationProps[scene.key] = addNavigationHelpers({
              ...this.props.navigation,
              state: scene.route,
          });
      }
      return navigation;
  }

  _getOverlayContainerStyle(progress) {
    const left = progress.interpolate({
      inputRange: [0, 0.999999, 1],
      outputRange: [0, 0, 100000], // move it off screen after transition is done
    });
    return {
      left,
    };
  }

  _getSharedElementStyle(props, prevProps, itemFrom, itemTo) {
    const { position, progress } = props;

    const getElementType = (item) => {
      const type = item.reactElement.type;
      return type && (type.displayName || type.name);
    }
    const animateWidthHeight = (itemFrom, itemTo) => {
      const width = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [itemFrom.metrics.width, itemTo.metrics.width],
      });
      const height = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [itemFrom.metrics.height, itemTo.metrics.height],
      });
      return { width, height };
    };

    const animateScale = (itemFrom, itemTo) => {
      const toVsFromScaleX = itemTo.scaleRelativeTo(itemFrom).x;
      const toVsFromScaleY = itemTo.scaleRelativeTo(itemFrom).y;
      // using progress is actually much simpler than position in previous implementation.
      const scaleX = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, toVsFromScaleX]
      });
      const scaleY = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, toVsFromScaleY]
      });
      const left = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [itemFrom.metrics.x, itemTo.metrics.x + itemFrom.metrics.width / 2 * (toVsFromScaleX - 1)],
      });
      const top = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [itemFrom.metrics.y, itemTo.metrics.y + itemFrom.metrics.height / 2 * (toVsFromScaleY - 1)],
      });
      return {
          left,
          top,
          transform: [
              { scaleX }, { scaleY }
          ]
      };
    };

    const animateFontSize = (itemFrom, itemTo) => {
      // This requires the shared Text to have a "fontSize" prop that is the same as the style.
      const getFontSize = element => (element.props && element.props.fontSize) || 12;
      return {
          fontSize: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [getFontSize(itemFrom.reactElement), getFontSize(itemTo.reactElement)],
          })
      };
    };

    const elementType = getElementType(itemFrom);
    let style;
    switch (elementType) {
      case 'Image': style = animateWidthHeight(itemFrom, itemTo); break;
      case 'Text': style = {
          ...animateWidthHeight(itemFrom, itemTo),
          ...animateFontSize(itemFrom, itemTo),
      };
          break;
      default:
          style = animateScale(itemFrom, itemTo);
    };

    const left = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [itemFrom.metrics.x, itemTo.metrics.x],
    });
    const top = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [itemFrom.metrics.y, itemTo.metrics.y],
    });

    return {
      zIndex: this._interpolateElevation(props, prevProps, 1), // make sure shared elements stay above the faked container
      position: 'absolute',
      left,
      top,
      right: null,
      bottom: null,
      ...style,
    };
  }

  _getBBox(metricsArray: Array<Metrics>) {
    let left, top, right, bottom;
    left = top = Number.MAX_VALUE;
    right = bottom = Number.MIN_VALUE;
    metricsArray.forEach(m => {
      if (m.x < left) left = m.x;
      if (m.y < top) top = m.y;
      if (m.x + m.width > right) right = m.x + m.width;
      if (m.y + m.height > bottom) bottom = m.y + m.height;
    });
    const width = right - left;
    const height = bottom - top;
    return { left, top, right, bottom, width, height };
  }

  _interpolateElevation(props, prevProps, base) {
    const { position, index } = props;

    const prevIndex = prevProps.index;
    const minIdx = Math.min(index, prevIndex);
    const maxIdx = Math.max(index, prevIndex);

    return position.interpolate({
      inputRange: [minIdx, maxIdx],
      outputRange: [5 + base, 25 + base],
    });
  }

  _renderFakedSEContainer(pairs, props, prevProps) {
    if (!prevProps || pairs.length === 0) return null;

    const fromItemBBox = this._getBBox(pairs.map(p => p.fromItem.metrics));
    const toItemBBox = this._getBBox(pairs.map(p => p.toItem.metrics));

    const { position, progress, index } = props;
    const prevIndex = prevProps.index;
    const minIdx = Math.min(index, prevIndex);
    const maxIdx = Math.max(index, prevIndex);
    const inputRange = [minIdx, maxIdx];
    const adaptRange = (range) => index > prevIndex ? range : range.reverse();
    const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

    const fromRoute = prevProps ? prevProps.scene.route.routeName : 'unknownRoute';
    const toRoute = props.scene.route.routeName;

    let opacityOutputRange = [0, 1];
    let leftOutputRange = [100, 30];
    let topOutputRange = [240, 170];
    let widthOutputRange = [windowWidth - 200, windowWidth - 60];
    let heightOutputRange = [windowHeight - 240, windowHeight - 240];

    if (fromRoute === 'CardView' && toRoute === 'DetailView') {
      opacityOutputRange = [0, 1];
      leftOutputRange = [30, 0];
      topOutputRange = [170, 0];
      widthOutputRange = [windowWidth - 60, windowWidth];
      heightOutputRange = [windowHeight - 240, windowHeight];
    }

    const opacity = position.interpolate({
      inputRange,
      outputRange: opacityOutputRange,
    });
    const left = position.interpolate({
      inputRange,
      outputRange: leftOutputRange,
    });
    const top = position.interpolate({
      inputRange,
      outputRange: topOutputRange,
    });

    const width = position.interpolate({
      inputRange,
      outputRange: widthOutputRange,
    });
    const height = position.interpolate({
      inputRange,
      outputRange: heightOutputRange,
    });
    const elevation = this._interpolateElevation(props, prevProps, 0);
    const style = {
      backgroundColor: '#fff',
      zIndex: this._interpolateElevation(props, prevProps, 0),
      position: 'absolute',
      left,
      top,
      width,
      height,
      borderRadius: 4,
      opacity
    };
    return <Animated.View style={style} />;
  }

  _renderDarkeningOverlay(progress, position, sceneIndex, transitionProps) {
    let bgOutputRange = ['rgba(185, 199, 209, 0)', 'rgba(185, 199, 209, 0)', 'rgba(185, 199, 209, 0)', 'rgba(185, 199, 209, 1)'];

    if (transitionProps.scene.route.routeName === 'DetailView') {
      bgOutputRange = ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'];      
    }

    const backgroundColor = position.interpolate({
      inputRange: [sceneIndex - 1, sceneIndex, sceneIndex + 0.4, sceneIndex + 1],
      outputRange: bgOutputRange,
    });

    const animatedStyle = {
      elevation: 5, // to ensure the overlay covers toolbar
      backgroundColor,
      ...this._getOverlayContainerStyle(progress)
    };
    return <Animated.View style={[styles.overlay, animatedStyle]} />;
  }

  _renderScene(transitionProps, scene) {
    const { position, progress } = transitionProps;
    const { index } = scene;
    const inputRange = [index - 1, index - 0.01, index, index + 0.99, index + 1];
    const opacity = position.interpolate({
        inputRange,
        outputRange: [0, 0, 1, 1, 0],
    });
    const style = { opacity };
    const Scene = this.props.router.getComponentForRouteName(scene.route.routeName);
    const navigation = this._getChildNavigation(scene);

    return (
      <Animated.View key={scene.route.key} style={[style, styles.scene]} onLayout={this._onLayout.bind(this)}>
        <Scene navigation={navigation} />
        {this._renderDarkeningOverlay(progress, position, index, transitionProps)}
      </Animated.View>
    );
  }

  _renderOverlay(props, prevProps) {
    const fromRoute = prevProps ? prevProps.scene.route.routeName : 'unknownRoute';
    const toRoute = props.scene.route.routeName;
    let pairs = this.state.sharedItems.getMeasuredItemPairs(fromRoute, toRoute);
    if (props.scene.route.params && props.scene.route.params.photo) {
      const clickedPhoto = props.scene.route.params.photo;
      pairs = pairs.filter(p => [`image-${clickedPhoto.name}`, `title-${clickedPhoto.name}`].indexOf(p.fromItem.name) > -1);
    }

    const sharedElements = pairs.map((pair, idx) => {
      const {fromItem, toItem} = pair;
      const animatedStyle = this._getSharedElementStyle(props, prevProps, fromItem, toItem);
      const element = fromItem.reactElement;
      const AnimatedComp = Animated.createAnimatedComponent(element.type);
      return React.createElement(AnimatedComp,
        { ...element.props, style: [element.props.style, animatedStyle], key: idx },
        element.props.children);
    });
    const containerStyle = this._getOverlayContainerStyle(props.progress);
    
    return (
      <Animated.View style={[styles.overlay, this.props.style, containerStyle]}>
        {this._renderFakedSEContainer(pairs, props, prevProps)}
        {sharedElements}
      </Animated.View>
    );
  }

  _renderHeader(scene) {
    return (
      <View style={{height: 200}}>
      </View>
    );
  }

  _render(transitionProps, prevtransitionProps) {
    const scenes = transitionProps.scenes.map(scene => this._renderScene(transitionProps, scene));
    const overlay = this._renderOverlay(transitionProps, prevtransitionProps);
    const header = this._renderHeader(transitionProps.scene);
    return (
      <View style={{flex: 1}}>
        {scenes}
        {overlay}
      </View>
    );
  }

  render() {
    return (
      <Transitioner
        configureTransition={this._configureTransition.bind(this)}
        render={this._render.bind(this)}
        navigation={this.props.navigation}
      />
    );
  }
};

const styles = StyleSheet.create({
  scenes: {
    flex: 1,
  },
  scene: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 100000, // invisible by default
    right: 0,
    bottom: 0,
  }
});