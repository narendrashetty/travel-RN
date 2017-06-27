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

export default class DetailView extends Component {

	renderHeader() {
		return (
			<View style={styles.header}>
				<SharedView name={`image-ICELAND`} containerRouteName='DetailView'>
					<Image source={require('./images/iceland.jpg')} style={styles.image} />
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
						<SharedView name={`title-ICELAND`} containerRouteName='DetailView'>
							<Text style={styles.imageTitle} fontSize={20}>ICELAND</Text>
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

	renderBody() {
		return (
			<ScrollView>
				<View style={{flex: 1, backgroundColor: '#fff', paddingTop: 20}}>
		      <Text style={[{
		        color: '#798390',
		        fontWeight: '700',
		        fontFamily: 'Avenir Next',
		        paddingLeft: 20,
		        paddingRight: 20,
		      }]}>
		        A ICELAND full of legends
		      </Text>

		      <Text style={{
		        color: '#798390',
		        fontSize: 14,
		        marginTop: 10,
		        fontFamily: 'Avenir Next',
		        paddingLeft: 20,
		        paddingRight: 20,
		      }}>
		        Iceland, a sparsely populated island with the North Atlantic all around it and flowing magma bubbling through its crust, is wild and remote all around it and flowing magma bubbling..., Iceland, a sparsely populated island with the North Atlantic all around it and flowing magma bubbling through its crust, is wild and remote all around it and flowing magma bubbling..., 
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
		      	marginTop: 20
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
		return (
			<View style={{flex: 1}}>
				{this.renderHeader()}
				{this.renderNav()}
				{this.renderBody()}
				{this.renderFooter()}
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











