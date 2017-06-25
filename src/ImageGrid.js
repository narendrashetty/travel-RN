import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';

const {height, width} = Dimensions.get('window');
const padding = 20;

const destinations = [{
  'name': 'ICELAND',
  'src': require('./images/iceland.jpg')
}, {
  'name': 'CANADA',
  'src': require('./images/canada.jpg')
}, {
  'name': 'COLOMBIA',
  'src': require('./images/colombia.jpg')
}, {
  'name': 'INDIA',
  'src': require('./images/india.png')
}, {
  'name': 'FINLAND',
  'src': require('./images/finland.jpg')
}, {
  'name': 'AMSTERDAM',
  'src': require('./images/amsterdam.jpg')
}, {
  'name': 'LONDON',
  'src': require('./images/london.jpg')
}, {
  'name': 'BARCELONA',
  'src': require('./images/barcelona.jpg')
}];

export default class ImageGrid extends Component {
  static navigationOptions = {
    'title': 'BEST IN TRAVEL'
  };

  renderImage(destination, i) {
    return (
      <View style={styles.imageContainer} key={i}>
        <Image source={destination.src} style={styles.image} />
        <Text style={styles.imageTitle}>{destination.name}</Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {destinations.map((des, i) => this.renderImage(des, i))}
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
    marginLeft: 20,
    marginBottom: 20,
    width: (width - padding * 3) / 2,
    height: (width - padding * 3) / 2,
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
