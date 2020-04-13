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
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get("window").width;

class NavigationDrawerStructure extends Component {
    toggleDrawer = () => {
        this.props.navigationProps.toggleDrawer();
    };
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                    <Image
                        source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
                        style={{ width: 25, height: 25, marginLeft: 15 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

class NavigationBackStructure extends Component {
    goBackwards = () => {
        this.props.navigationProps.goBack();
    };
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.goBackwards.bind(this)}>
                    <Image
                        source={require("../assets/back_arrow.png")}
                        style={{ width: 25, height: 25, marginLeft: 15 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

class IntroScreen extends Component {

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

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require("../assets/logo.png")} style={{ height: SCREEN_WIDTH * 0.65, width: SCREEN_WIDTH * 0.85 }}/>
            </View>


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
        navigationOptions: ({ navigation }) => ({
              title: 'Home',
              headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
              headerStyle: {
                  backgroundColor: '#D0C9D6',
              },
              headerTintColor: 'black',
      }),
  },
  CameraScreen: {
    screen: CameraScreen,
     navigationOptions: ({ navigation }) => ({
         title: 'Strip scanner',
         headerLeft: <NavigationBackStructure navigationProps={navigation} />,
         headerStyle: {
             backgroundColor: '#D0C9D6',
         },
         headerTintColor: 'black',
    }),


  },

    AnimationScreen: {
    screen: AnimationScreen,
     navigationOptions: ({ navigation }) => ({
      title: 'Animation Screen'
    }),


  },
  QRCodeScreen: {
    screen: QRCodeScreen,
       navigationOptions: ({ navigation }) => ({
      title: 'Scan the QR code'
    }),
},
ResultsScreen: {
  screen: ResultsScreen,
     navigationOptions: ({ navigation }) => ({
    title: 'Results'
  }),
},
  AnalyseDataScreen: {
    screen: AnalyseDataScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Data Analysis'
    }),


  },
},{

defaultNavigationOptions: {

      headerStyle: {
        backgroundColor: '#D0C9D6',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }
}

);

export default createAppContainer(AppNavigator);
