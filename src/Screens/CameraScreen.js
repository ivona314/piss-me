import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { RNCamera as Camera } from 'react-native-camera';
import Toast, {DURATION} from 'react-native-easy-toast'
import {NativeModules, Dimensions} from 'react-native';

import styles from '../Styles/Screens/CameraScreen';
import OpenCV from '../NativeModules/OpenCV';
import SearchingAnimation from '../assets/svg/SearchingAnimation';
import ColorSquare from '../assets/svg/ColorSquare';
import AnalyseDataScreen from './AnalyseDataScreen';
import ResultsScreen from './ResultsScreen';
import WhiteBackground from './WhiteBackground';


import FoundAnimation from '../assets/svg/FoundAnimation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

var ImageProcessing = NativeModules.ImageProcessing;
console.disableYellowBox = true;
class CameraScreen extends Component {
 static navigationOptions = {
		header: null,

  }
  constructor(props) {
    super(props);

    this.takePicture = this.takePicture.bind(this);
    this.checkForBlurryImage = this.checkForBlurryImage.bind(this);
    this.proceedWithCheckingBlurryImage = this.proceedWithCheckingBlurryImage.bind(this);
    this.repeatPhoto = this.repeatPhoto.bind(this);
    this.usePhoto = this.usePhoto.bind(this);
    setInterval(() => {
      this.takePicture();
    },
    // Define any blinking time.
    1000);






  }


  state = {
    foundVisible: false,
    loadingVisible: true,
    whiteBackgroundVisible: false,
    showColorSquares: false,
    colors: ['rgb(255, 0, 255)',
    'rgb(0, 0, 255)',
    'rgb(255, 255, 0)',
    'rgb(255, 255, 0)',
    'rgb(255, 255, 255)',
    'rgb(225, 245, 0)',
    'rgb(215, 235, 0)',
    'rgb(195, 225, 0)',
    'rgb(175, 215, 0)',
    'rgb(165, 205, 0)',
    'rgb(145, 195, 0)',
    'rgb(125, 185, 0)'],

    cameraPermission: false,
    photoAsBase64: {
      content: '',
      isPhotoPreview: false,
      photoPath: '',
      events: '',
    },
  };




  checkForBlurryImage(imageAsBase64) {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        OpenCV.checkForBlurryImage(imageAsBase64, error => {
          // error handling
        }, msg => {
          resolve(msg);
        });
      } else {

      var {height, width} = Dimensions.get('window');
		ImageProcessing.checkPixels(imageAsBase64,
		 height,
		  width,
		  styles.topLeftCorner.left, //100
		  styles.topLeftCorner.top, //50
		  styles.bottomRightCorner.right, //100
		  styles.bottomRightCorner.bottom, //150

		   (error, dataArray) => {

      		//resolve(dataArray[1])
      		let str = dataArray[0][0];
      		if (dataArray[0][0] != 0 && this.state.loadingVisible){
            setTimeout(() => {
                this.setState({showColorSquares: true});
            },
            // Define any blinking time.
            100);
            this.setState({whiteBackgroundVisible: true});
          

            this.setState({ loadingVisible: false});
				    this.setState({colors: []});
      			for (var i=0; i<12; i++){
      				let colorstr = 'rgb(' + dataArray[i][2] + ',' + dataArray[i][1] + ',' + dataArray[i][0] + ')';
					    this.setState({ colors: [...this.state.colors, colorstr] });
      			}
      		}


      		//this.setState({colors: [colorstr1, colorstr2, colorstr3]});
			//this.refs.toast.show(str,DURATION.FOREVER);
          	//if (dataArray[0]>300 && dataArray[0]<500 && dataArray[1]>100 && dataArray[1]<650){
      	      //this.setState({ foundVisible: true});
      	      //this.setState({ loadingVisible: false});
      	      //this.OpenAnalyseDataScreen();

          		//this.refs.toast.show("ok",DURATION.FOREVER);
			//} else {

          	//}

      });
      /*
        OpenCV.checkForBlurryImage(imageAsBase64, (error, dataArray) => {
          resolve(dataArray[0]);
        });
        */
      }
    });
  }

  proceedWithCheckingBlurryImage() {
    const { content, photoPath } = this.state.photoAsBase64;


    this.checkForBlurryImage(content).then(blurryPhoto => {
      //if (blurryPhoto) {
       // this.refs.toast.show('Photo is blurred!',DURATION.FOREVER);
      //  return this.repeatPhoto();
      //}
      //this.refs.toast.show('Photo is clear!', DURATION.FOREVER);
      //this.setState({ photoAsBase64: { ...this.state.photoAsBase64, isPhotoPreview: true, photoPath } });
    }).catch(err => {
      console.log('err', err)
    });
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({
        ...this.state,
        photoAsBase64: { content: data.base64, isPhotoPreview: false, photoPath: data.uri },
      });
      this.proceedWithCheckingBlurryImage();
    }
  }


  repeatPhoto() {
    this.setState({
      ...this.state,
      photoAsBase64: {
        content: '',
        isPhotoPreview: false,
        photoPath: '',
      },
    });
  }

  usePhoto() {
    // do something, e.g. navigate
  }


  render() {
    if (this.state.photoAsBase64.isPhotoPreview) {
      return (
        <View style={styles.container}>
          {/*<Toast ref="toast" position="center" /> */}
          <Image
            source={{ uri: `data:image/png;base64,${this.state.photoAsBase64.content}` }}
            style={styles.imagePreview}
          />
          <View style={styles.repeatPhotoContainer}>
            <TouchableOpacity onPress={this.repeatPhoto}>
              <Text style={styles.photoPreviewRepeatPhotoText}>
                Repeat photo
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.usePhotoContainer}>
            <TouchableOpacity onPress={this.usePhoto}>
              <Text style={styles.photoPreviewUsePhotoText}>
                Use photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>


        <Camera
          ref={cam => {
            this.camera = cam;

          }}
          style={styles.preview}
          playSoundOnCapture={true}

        >
        <Image style={Platform.OS === 'android' ? styles.androidImg : styles.topLeftCorner} source={require('../assets/corner.png')}/>
        <Image style={Platform.OS === 'android' ? styles.androidImg : styles.topRightCorner} source={require('../assets/corner.png')}/>
        <Image style={Platform.OS === 'android' ? styles.androidImg : styles.bottomLeftCorner} source={require('../assets/corner.png')}/>
        <Image style={Platform.OS === 'android' ? styles.androidImg : styles.bottomRightCorner} source={require('../assets/corner.png')}/>
			<SearchingAnimation visible={this.state.loadingVisible}/>
         	<FoundAnimation visible={this.state.foundVisible}/>

        </Camera>
        <WhiteBackground visible={this.state.whiteBackgroundVisible}/>

		<ColorSquare colors={this.state.colors} visible={this.state.showColorSquares} top={30}/>
        {/* <Toast ref="toast" position="center" /> */}
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  CameraScreen: {
    screen: CameraScreen,
  },
});

export default createAppContainer(AppNavigator);
