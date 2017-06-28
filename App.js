import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';

import App from './src/App';

export default class travel extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <App />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#B9C7D2'
  }
});
