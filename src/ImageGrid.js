import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class ImageGrid extends Component {
  static navigationOptions = {
    'title': 'BEST IN TRAVEL',
    'headerLeft': <Icon name="search" size={22} color="#000" style={{marginLeft: 12}} />,
    'headerRight': <Icon name="bars" size={22} color="#000" style={{marginRight: 12}} />,
  };


  render() {
    return <View style={{backgroundColor: 'transparent'}}><Text>Hello World</Text></View>;
  }
}

const styles = StyleSheet.create({
  
});
