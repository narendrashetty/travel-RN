import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  ListView,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';
import _ from 'lodash';
import SharedView from './SharedView';
import Toolbar from './Toolbar';

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

const {width: windowWidth} = Dimensions.get('window');
const margin = 20;
const colCount = 2;

const photoWidth = (windowWidth - margin * colCount * 2) / colCount;


const photoRows = _.chunk(destinations, colCount);

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
});

export default class ImageGrid extends Component {
  static navigationOptions = {
    'title': 'BEST IN TRAVEL'
  };

  renderRow(photos) {
    return (
        <View style={styles.row}>
            {photos.map(this.renderCell.bind(this))}
        </View>
    );
  }

  renderCell(photo) {
    const onPhotoPressed = photo => this.props.navigation.navigate('CardView', { photo });
    return (
      <TouchableWithoutFeedback onPress={() => onPhotoPressed(photo)} key={photo.name}>
          <View style={styles.imageContainer}>
            <SharedView name={`image-${photo.name}`} containerRouteName='ImageGrid'>
                <Image source={photo.src} style={styles.image} />
            </SharedView>
            <SharedView name={`title-${photo.name}`} containerRouteName='ImageGrid' style={{
              position: 'absolute',
              left: 0,
              right: 0,
              margin: 'auto',
            }}>
              <Text style={styles.imageTitle} fontSize={16}>{photo.name}</Text>
            </SharedView>
          </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar key="CardView" />
        <ListView
          dataSource={ds.cloneWithRows(photoRows)}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  'container': {
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  'imageContainer': {
    position: 'relative',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  'image': {
    width: photoWidth,
    height: photoWidth,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  'imageTitle': {
    textAlign: 'center',
    backgroundColor: 'transparent',
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
