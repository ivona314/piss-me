import React, { Component } from 'react';

import {Image} from 'react-native';
import styles from '../../Styles/Screens/CameraScreen';


export default class FoundAnimation extends Component {

	render(){
		if (this.props.visible){
			return(
				<Image style={styles.found} source={require('../found_once.gif')} />
			);
		} else {
			return(null);
		}
		
	}

}