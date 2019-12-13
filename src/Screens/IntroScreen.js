import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  Button,
  Animated,
  Easing
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast'
import {NativeModules, Dimensions} from 'react-native';

import styles from '../Styles/Screens/IntroScreenStyles';

import OpenCV from '../NativeModules/OpenCV';
import CameraScreen from './CameraScreen';
import QRCodeScreen from './QRCodeScreen';
import AnalyseDataScreen from './AnalyseDataScreen';
import AnimationScreen from './AnimationScreen';
import ResultsScreen from './ResultsScreen';

import Video from "react-native-video";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Sound from 'react-native-sound';



class IntroScreen extends Component {

 static navigationOptions = {
		header: null,
  }

  constructor(props) {
    super(props);
  }


  sound = new Sound('sound.mp3');

    playSound = () => {
        this.sound.play()
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
						             onPress={() =>{this.playSound}}>


            <Text style={styles.text}>LEARN MORE</Text>

		</TouchableOpacity>

		<TouchableOpacity style={styles.btn_scan_code}
		                     onPress={() => this.props.navigation.navigate('CameraScreen')}>
            <Text style={styles.text}>SCAN THE STRIP</Text>
		</TouchableOpacity>

       	</View>
		);

}
}

const fade = (props) => {
    const {position, scene} = props

    const index = scene.index

    const translateX = 0
    const translateY = 0

    const opacity = position.interpolate({
        inputRange: [index - 0.7, index, index + 0.7],
        outputRange: [0.3, 1, 0.3]
    })

    return {
        opacity,
        transform: [{translateX}, {translateY}]
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

    AnimationScreen: {
    screen: AnimationScreen,
     navigationOptions: ({ navigation }) => ({
      title: 'Animation Screen',
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
ResultsScreen: {
  screen: ResultsScreen,
     navigationOptions: ({ navigation }) => ({
    title: 'Results',
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

    transitionConfig: () => ({
        screenInterpolator: (props) => {
            return fade(props)
        }
    })

}

);

export default createAppContainer(AppNavigator);
