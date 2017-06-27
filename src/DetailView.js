import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Dimensions,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import SharedView from './SharedView';

const {height, width} = Dimensions.get('window');

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 50;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class DetailView extends Component {

	constructor(props) {
		super(props);
		this.state = {
      'scrollY': new Animated.Value(0)
    };
	}

	renderHeader(photo) {
		const headerHeight = this.state.scrollY.interpolate({
      inputRange: [-200, 0, HEADER_SCROLL_DISTANCE],
      outputRange: [400, HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

		return (
			<View style={styles.header}>
				<SharedView name={`image-${photo.name}`} containerRouteName='DetailView'>
					<Animated.Image source={photo.src} style={[styles.image, {height: headerHeight}]} />
				</SharedView>
				<View style={{
					position: 'absolute',
					left: 0,
          right: 0,
          margin: 'auto',
          marginTop: 10
				}}>
					<View style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between'
					}}>
						<Icon name="search" size={22} color="#fff" style={{marginLeft: 20,'textShadowColor': '#777','textShadowOffset': {'width': 1,'height': 1},'textShadowRadius': 0, backgroundColor: 'transparent'}} />
						<SharedView name={`title-${photo.name}`} containerRouteName='DetailView'>
							<Text style={styles.imageTitle} fontSize={20}>{photo.name}</Text>
						</SharedView>
						<Icon name="bars" size={22} color="#fff" style={{marginRight: 20,'textShadowColor': '#777','textShadowOffset': {'width': 1,'height': 1},'textShadowRadius': 0, backgroundColor: 'transparent'}} />
					</View>
				</View>
			</View>
		);
	}

	renderNav() {
		return (
			<View style={{
				height: 50,
				flexDirection: 'row',
				backgroundColor: '#fff',
				alignItems: 'center',
				justifyContent: 'space-between',
				paddingLeft: 20,
				paddingRight: 20,
				borderColor: '#ECF2F5',
				borderBottomWidth: 1
			}}>
				<Text style={styles.navText}>EXPERIENCES</Text>
				<Text style={styles.navText}>MAP</Text>
				<Text style={styles.navText}>SURVIVAL GUIDE</Text>
			</View>
		);
	}

	renderBody(photo) {
		return (
			<ScrollView 
				scrollEventThrottle={16}
        onScroll={
          Animated.event([{
            nativeEvent: { contentOffset: { y: this.state.scrollY } }
          }])
        }
			>
				<View style={{flex: 1, backgroundColor: '#fff', paddingTop: 20}}>
		      <Text style={[{
		        color: '#798390',
		        fontWeight: '700',
		        fontFamily: 'Avenir Next',
		        paddingLeft: 20,
		        paddingRight: 20,
		      }]}>
		        {photo.title}
		      </Text>

		      <Text style={{
		        color: '#798390',
		        fontSize: 14,
		        marginTop: 10,
		        fontFamily: 'Avenir Next',
		        paddingLeft: 20,
		        paddingRight: 20,
		      }}>
		        {photo.subtitle} {photo.subtitle}
		      </Text>

		      <Text style={[{
		        color: '#798390',
		        fontWeight: '700',
		        fontFamily: 'Avenir Next',
		        paddingLeft: 20,
		        paddingRight: 20,
		        marginTop: 20
		      }]}>
		        Top Experiences
		      </Text>

		      <View style={{
		      	flexDirection: 'row',
		      	marginTop: 20,
		      	flexWrap: 'wrap'
		      }}>
		      	<View style={{
		      		backgroundColor: '#83ABEC',
		      		width: width / 2,
		      		height: width / 2,
		      	}}>
		      	</View>
		      	<View style={{
		      		backgroundColor: '#14779A',
		      		width: width / 2,
		      		height: width / 2,
		      	}}>
		      	</View>
		      	<View style={{
		      		backgroundColor: '#E1F400',
		      		width: width / 2,
		      		height: width / 2,
		      	}}>
		      	</View>
		      	<View style={{
		      		backgroundColor: '#DD3B3B',
		      		width: width / 2,
		      		height: width / 2,
		      	}}>
		      	</View>
		      	<View style={{
		      		backgroundColor: '#00E45F',
		      		width: width / 2,
		      		height: width / 2,
		      	}}>
		      	</View>
		      	<View style={{
		      		backgroundColor: '#E26F70',
		      		width: width / 2,
		      		height: width / 2,
		      	}}>
		      	</View>
		      	<View style={{
		      		backgroundColor: '#FFCDC3',
		      		width: width / 2,
		      		height: width / 2,
		      	}}>
		      	</View>
		      	<View style={{
		      		backgroundColor: '#AAD7EB',
		      		width: width / 2,
		      		height: width / 2,
		      	}}>
		      	</View>
		      	
		      </View>
		    </View>
		  </ScrollView>
	  );
	}

	renderFooter() {
		return (
			<View style={{
        backgroundColor: '#F2F3F8',
        height: 50,
      }}>

      </View>
		);
	}

	render() {
		const { photo } = this.props.navigation.state.params;
		return (
			<View style={{flex: 1, backgroundColor: '#fff'}}>
				{this.renderHeader(photo)}
				{this.renderNav()}
				{this.renderBody(photo)}
			</View>
		);
	}

}

const styles = StyleSheet.create({
	'header': {
		position: 'relative'
	},

	'image': {
		width,
		height: 200
	},

	'imageTitle': {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textShadowColor: '#3a3a3a',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 0
  },
  'navText': {
  	color: '#798390',
    fontWeight: '600',
    fontFamily: 'Avenir Next',
  }
});











