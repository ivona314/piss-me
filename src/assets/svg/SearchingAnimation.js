import React, { Component } from 'react';

import {Image} from 'react-native';
import styles from '../../Styles/Screens/CameraScreen';


export default class SearchingAnimation extends Component {

	render(){
		if (this.props.visible){
			return(
				<Image style={styles.loading} source={require('../searching.gif')} />
			);
		} else {
			return(null);
		}
		
	}

}