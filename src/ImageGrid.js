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
  TouchableHighlight
} from 'react-native';

const {height, width} = Dimensions.get('window');
const padding = 20;

export default class ImageGrid extends Component {
  static navigationOptions = {
    'title': 'BEST IN TRAVEL'
  };

  constructor(props) {
    super(props);
    this.state = {
      'destinations': [{
        'name': 'ICELAND',
        'src': require('./images/iceland.jpg'),
        'selected': false
      }, {
        'name': 'CANADA',
        'src': require('./images/canada.jpg'),
        'selected': false
      }, {
        'name': 'COLOMBIA',
        'src': require('./images/colombia.jpg'),
        'selected': false
      }, {
        'name': 'INDIA',
        'src': require('./images/india.png'),
        'selected': false
      }, {
        'name': 'FINLAND',
        'src': require('./images/finland.jpg'),
        'selected': false
      }, {
        'name': 'AMSTERDAM',
        'src': require('./images/amsterdam.jpg'),
        'selected': false
      }, {
        'name': 'LONDON',
        'src': require('./images/london.jpg'),
        'selected': false
      }, {
        'name': 'BARCELONA',
        'src': require('./images/barcelona.jpg'),
        'selected': false
      }],
      'imageWidth': new Animated.Value(0),
    };
  }

  renderImage(destination, i) {
    const imageWidth = this.state.imageWidth.interpolate({
      inputRange: [0, 100],
      outputRange: [(width - padding * 3) / 2, (width - padding * 2)],
      extrapolate: 'clamp'
    });
    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('CardView')} key={i}>
        <Animated.View style={styles.imageContainer}>
          <Image source={destination.src} style={styles.image} />
          <Text style={styles.imageTitle}>{destination.name}</Text>
        </Animated.View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.state.destinations.map((des, i) => this.renderImage(des, i))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  'container': {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  'imageContainer': {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginLeft: padding,
    marginBottom: padding,
  },

  'image': {
    width: (width - padding * 3) / 2,
    height: (width - padding * 3) / 2,
    borderRadius: 4
  },

  'imageTitle': {
    position: 'absolute',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: '#3a3a3a',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 0
  }
});
