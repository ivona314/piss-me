import React, { Component } from 'react';

import {Image} from 'react-native';
import styles from '../../Styles/Screens/CameraScreen';


export default class IntroAnimation extends Component {

	render(){
		if (this.props.visible){
			return(
				<Image style={styles.intro} source={require('../banner3.gif')} />
			);
		} else {
			return(null);
		}
		
	}

}