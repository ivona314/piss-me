import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast'
import {NativeModules, Dimensions} from 'react-native';

import styles from '../Styles/Screens/CameraScreen';

import OpenCV from '../NativeModules/OpenCV';
import CameraScreen from './CameraScreen';
import QRCodeScreen from './QRCodeScreen';
import AnalyseDataScreen from './AnalyseDataScreen';

import Video from "react-native-video";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class IntroScreen extends Component {

 static navigationOptions = {
		header: null,
  }
  constructor(props) {
    super(props);
    }





render() {
   
      return (
		<View>
	    <Video
source={require("../assets/video.mp4")}
style={styles.backgroundVideo}
muted={true}
repeat={true}
resizeMode={"cover"}
rate={1.0}
ignoreSilentSwitch={"obey"}
/>

        <Text style={styles.text_wellcome}>Wellcome to{"\n"}MANÉO</Text>
    

		<TouchableOpacity style={styles.btn_learn_more}
						             onPress={() => this.props.navigation.navigate('AnalyseDataScreen')}>


            <Text style={styles.text}>LEARN MORE</Text>

		</TouchableOpacity>
		
		<TouchableOpacity style={styles.btn_scan_code} 
		                     onPress={() => this.props.navigation.navigate('CameraScreen')}>
            <Text style={styles.text}>SCAN QR CODE</Text>
		</TouchableOpacity>

       	</View>
		);
  
}
}

const AppNavigator = createStackNavigator({
  Intro: {
    screen: IntroScreen,
  },
  CameraScreen: {
    screen: CameraScreen,
     navigationOptions: ({ navigation }) => ({
      title: 'Strip scanner',
       headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
    
    
  },
  QRCodeScreen: {
    screen: QRCodeScreen,
       navigationOptions: ({ navigation }) => ({
      title: 'Scan the QR code',
       headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),

    
    
  },
  AnalyseDataScreen: {
    screen: AnalyseDataScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Data Analysis',
       headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),

   
  },
},{

defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0099aa',
      },
      headerMode: 'screen',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    },


}

);

export default createAppContainer(AppNavigator);

