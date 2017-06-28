import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Animated,
  PanResponder
} from 'react-native';

const {height, width} = Dimensions.get('window');
const padding = 20;

// const { width: windowWidth } = Dimensions.get("window");


import SharedView from './SharedView';
import Toolbar from './Toolbar';

const swipeDirections = {
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
};

function isValidSwipe(velocity, velocityThreshold, directionalOffset, directionalOffsetThreshold) {
  console.log(velocity);
  console.log(directionalOffset);
  return Math.abs(velocity) >= velocityThreshold && Math.abs(directionalOffset) < directionalOffsetThreshold;
}

const destinations = [{
  'id': 0,
  'name': 'ICELAND',
  'src': require('./images/iceland.jpg'),
  'title': 'A ICELAND full of legends',
  'subtitle': 'Iceland, a sparsely populated island with the North Atlantic all around it and flowing magma bubbling through its crust, is wild and remote all around it and flowing magma bubbling...'
}, {
  'id': 1,
  'name': 'CANADA',
  'src': require('./images/canada.jpg'),
  'title': 'A CANADA full of legends',
  'subtitle': 'Iceland, a sparsely populated island with the North Atlantic all around it and flowing magma bubbling through its crust, is wild and remote all around it and flowing magma bubbling...'
}, {
  'id': 2,
  'name': 'COLOMBIA',
  'src': require('./images/colombia.jpg'),
  'title': 'A COLOMBIA full of legends',
  'subtitle': 'Iceland, a sparsely populated island with the North Atlantic all around it and flowing magma bubbling through its crust, is wild and remote all around it and flowing magma bubbling...'
}, {
  'id': 3,
  'name': 'INDIA',
  'src': require('./images/india.png'),
  'title': 'A INDIA full of legends',
  'subtitle': 'Iceland, a sparsely populated island with the North Atlantic all around it and flowing magma bubbling through its crust, is wild and remote all around it and flowing magma bubbling...'
}, {
  'id': 4,
  'name': 'FINLAND',
  'src': require('./images/finland.jpg'),
  'title': 'A FINLAND full of legends',
  'subtitle': 'Iceland, a sparsely populated island with the North Atlantic all around it and flowing magma bubbling through its crust, is wild and remote all around it and flowing magma bubbling...'
}, {
  'id': 5,
  'name': 'NETHERLANDS',
  'src': require('./images/amsterdam.jpg'),
  'title': 'A AMSTERDAM full of legends',
  'subtitle': 'Iceland, a sparsely populated island with the North Atlantic all around it and flowing magma bubbling through its crust, is wild and remote all around it and flowing magma bubbling...'
}, {
  'id': 6,
  'name': 'ENGLAND',
  'src': require('./images/london.jpg'),
  'title': 'A LONDON full of legends',
  'subtitle': 'Iceland, a sparsely populated island with the North Atlantic all around it and flowing magma bubbling through its crust, is wild and remote all around it and flowing magma bubbling...'
}, {
  'id': 7,
  'name': 'SPAIN',
  'src': require('./images/barcelona.jpg'),
  'title': 'A BARCELONA full of legends',
  'subtitle': 'Iceland, a sparsely populated island with the North Atlantic all around it and flowing magma bubbling through its crust, is wild and remote all around it and flowing magma bubbling...'
}];

export default class CardView extends Component {
  static navigationOptions = {
    'title': 'BEST IN TRAVEL'
  };

  constructor(props) {
    super(props);
    this.state = {
      pan : new Animated.ValueXY({x:-1 * (width - padding * 3) * props.navigation.state.params.photo.id, y: 0}),
      currentDestination: props.navigation.state.params.photo.id
    };

    this.currentLeft = -1 * (width - padding * 3);

    this.swipeConfig = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
  }
  componentWillMount() {
    this._animatedValueX = -1 * (width - padding * 3) * this.state.currentDestination;
    this._animatedValueY = 0; 
    this.state.pan.x.addListener((value) => this._animatedValueX = value.value);
    this.state.pan.y.addListener((value) => this._animatedValueY = value.value);

    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: (e, gestureState) => {
          this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
          this.state.pan.setValue({x: 0, y: 0});
        },
        onPanResponderMove : Animated.event([null,{
            dx : this.state.pan.x
        }]),
        onPanResponderRelease: (evt, gestureState) => {
          const swipeDirection = this._getSwipeDirection(gestureState);
          this._triggerSwipeHandlers(swipeDirection, gestureState);
        }
    });
  }

  _triggerSwipeHandlers(swipeDirection, gestureState) {
    const {SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP} = swipeDirections;
    switch (swipeDirection) {
      case SWIPE_LEFT:
        this.onSwipeLeft(gestureState);
        break;
      case SWIPE_RIGHT:
        this.onSwipeRight(gestureState);
        break;
      case SWIPE_UP:
        this.onSwipeUp(gestureState);
      default:
        Animated.spring(this.state.pan, {
          toValue: 0
        }).start();
    }
  }

  onSwipeLeft(gestureState) {
    if (this.state.currentDestination === destinations.length - 1) {
      Animated.spring(this.state.pan, {
        toValue: 0
      }).start();
    } else {
      this.setState((prevState) => {
        return {
          'currentDestination': prevState.currentDestination + 1
        };
      });
      Animated.spring(this.state.pan, {
        toValue: {x: -1 * (width - padding * 3), y: 0}
      }).start();
    }
  }

  onSwipeRight(gestureState) {
    if (this.state.currentDestination === 0) {
      Animated.spring(this.state.pan, {
        toValue: 0
      }).start();  
    } else {
      this.setState((prevState) => {
        return {
          'currentDestination': prevState.currentDestination - 1
        };
      });
      Animated.spring(this.state.pan, {
        toValue: {x: (width - padding * 3), y: 0}
      }).start();
    }
  }

  onSwipeUp(gestureState) {
    const { photo } = this.props.navigation.state.params;
    this.props.navigation.navigate('DetailView', {
      photo: destinations[this.state.currentDestination]
    });
  }

  _getSwipeDirection(gestureState) {
    const {SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN} = swipeDirections;
    const {dx, dy} = gestureState;
    if (this._isValidHorizontalSwipe(gestureState)) {
      return (dx > 0)
        ? SWIPE_RIGHT
        : SWIPE_LEFT;
    } else if (this._isValidVerticalSwipe(gestureState)) {
      return (dy > 0)
        ? SWIPE_DOWN
        : SWIPE_UP;
    }
    return null;
  }

  _isValidHorizontalSwipe(gestureState) {
    const {vx, dy} = gestureState;
    const {velocityThreshold, directionalOffsetThreshold} = this.swipeConfig;
    return isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold);
  }

  _isValidVerticalSwipe(gestureState) {
    const {vy, dx} = gestureState;
    const {velocityThreshold, directionalOffsetThreshold} = this.swipeConfig;
    return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold);
  }

  renderImage(destination, i) {
    return (
      <View style={[styles.imageContainer]} key={i}>
        <SharedView name={`image-${destination.name}`} containerRouteName='CardView'>
          <Image source={destination.src} style={styles.image}>
          </Image>
        </SharedView>
        <SharedView name={`title-${destination.name}`} containerRouteName='CardView' style={{
              position: 'absolute',
              left: 0,
              right: 0,
              margin: 'auto',
            }}>
          <Text style={styles.imageTitle} fontSize={30}>{destination.name}</Text>
        </SharedView>
      </View>
    );
  }

  renderFooter() {
    return (
      <View style={{
        backgroundColor: '#F2F3F8',
        height: 60,
        marginTop: 10
      }}>

      </View>
    );
  }

  renderText(des, key) {
    const curr = (width - padding * 3) * key * -1;
    const left = this.state.pan.x.interpolate({
      inputRange: [curr - (width - padding * 3), curr, curr + width - (padding * 3)],
      outputRange: [-20, 0, 20],
      extrapolate: 'clamp'
    });

    const opacity = this.state.pan.x.interpolate({
      inputRange: [curr - (width - padding * 3), curr, curr + width - (padding * 3)],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp'
    });
    return (
      <Animated.View key={key} style={{
        'position': 'absolute',
        left: left,
        opacity: opacity,
        backgroundColor: 'transparent'
      }}>
        <Text style={[{
          color: '#798390',
          fontWeight: '700',
          fontSize: 16,
          fontFamily: 'Avenir Next',
          paddingLeft: 20,
          paddingRight: 20,
        }]}>
          {des.title}
        </Text>

        <Text style={{
          color: '#798390',
          fontSize: 14,
          marginTop: 10,
          fontFamily: 'Avenir Next',
          paddingLeft: 20,
          paddingRight: 20,
        }}>
          {des.subtitle}
        </Text>
      </Animated.View>
    );
  }

  renderDescription() {
    const currentCity = destinations[this.state.currentDestination]
    return (
      <View style={styles.desc}>
        <View style={[{height: 150, position: 'relative'}]}>
        {destinations.map((des, key) => this.renderText(des, key))}
        </View>
        {this.renderFooter()}
      </View>
    );
  }

  render() {
    const { photo } = this.props.navigation.state.params;
    const { name, src, title, subtitle } = photo;

    return (
      <View style={styles.container}>
        <Toolbar />
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[styles.imageSliderContainer, this.state.pan.getLayout()]}
        >
          {destinations.map((des, i) => this.renderImage(des, i))}
        </Animated.View>
        {this.renderDescription()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  'container': {
    // flex: 1
  },
  'imageSliderContainer': {
    'paddingTop': 130,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    position : 'absolute',
    zIndex: 10,
    height: (width - padding * 4),
  },

  'imageContainer': {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginLeft: 20
  },

  'desc': {
    height: height - padding * 2 - 200,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 120,
    paddingTop: 210,
    width: width - padding * 3,
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
  },

  // image: {
  //     width: windowWidth,
  //     height: windowWidth,
  // },

  'image': {
    width: (width - padding * 4),
    height: (width - padding * 4),
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  'imageTitle': {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    textShadowColor: '#3a3a3a',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 0
  }
});
