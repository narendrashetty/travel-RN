import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

import { StackNavigator } from 'react-navigation';

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
    'headerStyle': {
      'backgroundColor': 'transparent',
      'shadowOpacity': 0,
    }
  }
});


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
