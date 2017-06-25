import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import ImageGrid from './ImageGrid';

export default StackNavigator({
  'ImageGrid': {
    'screen': ImageGrid,
  }
}, {
  'cardStyle': {
    'shadowColor': 'transparent',
    'backgroundColor': 'transparent',
  },
  'navigationOptions': {
    'headerLeft': <Icon name="search" size={22} color="#fff" style={{marginLeft: 20,'textShadowColor': '#777','textShadowOffset': {'width': 1,'height': 1},'textShadowRadius': 0}} />,
    'headerRight': <Icon name="bars" size={22} color="#fff" style={{marginRight: 20,'textShadowColor': '#777','textShadowOffset': {'width': 1,'height': 1},'textShadowRadius': 0}} />,
    'headerStyle': {
      'backgroundColor': 'transparent',
      'shadowOpacity': 0,
      'paddingTop': 0,
    },
    'headerTitleStyle': {
      'color': '#fff',
      'textShadowColor': '#777',
      'textShadowOffset': {
        'width': 1,
        'height': 1
      },
      'textShadowRadius': 0
    }
  }
});


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
