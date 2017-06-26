import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ImageGrid extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Icon name="search" size={22} color="#fff" style={{marginLeft: 20,'textShadowColor': '#777','textShadowOffset': {'width': 1,'height': 1},'textShadowRadius': 0}} />
          <Text style={styles.headerText}>BEST IN TRAVEL</Text>
        <Icon name="bars" size={22} color="#fff" style={{marginRight: 20,'textShadowColor': '#777','textShadowOffset': {'width': 1,'height': 1},'textShadowRadius': 0}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  'container': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50
  },

  'headerText': {
    'fontSize': 20,
    'color': '#fff',
    'fontWeight': 'bold',
    'textShadowColor': '#777',
    'textShadowOffset': {
      'width': 1,
      'height': 1
    },
    'textShadowRadius': 0
  }
});
