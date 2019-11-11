import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import { RNCamera as Camera } from 'react-native-camera';
import Toast, {DURATION} from 'react-native-easy-toast'
import {NativeModules, Dimensions} from 'react-native';

import styles from '../Styles/Screens/CameraScreen';
import OpenCV from '../NativeModules/OpenCV';
import CircleWithinCircle from '../assets/svg/CircleWithinCircle';
import SearchingAnimation from '../assets/svg/SearchingAnimation';
import FoundAnimation from '../assets/svg/FoundAnimation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

var CalendarManager = NativeModules.CalendarManager;

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
    2000);
    
  }
   
 
  state = {
    foundVisible: false, 
    loadingVisible: true, 

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
		CalendarManager.checkPixels(imageAsBase64,
		 height,
		  width,
		  styles.topLeftCorner.left, //100
		  styles.topLeftCorner.top, //50
		  styles.bottomRightCorner.right, //100
		  styles.bottomRightCorner.bottom, //150

		   (error, dataArray) => {
      		resolve(dataArray[1])
			//this.refs.toast.show(dataArray[1],DURATION.FOREVER);
          	if (dataArray[1]>550 && dataArray[1]<700 && dataArray[0]>100 && dataArray[0]<150){
      	      this.setState({ foundVisible: true});
      	      this.setState({ loadingVisible: false});
      	      
          		//this.refs.toast.show("ok",DURATION.FOREVER);
			} else {

          	}

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
          <Toast ref="toast" position="center" />
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
          
        >
        <Image style={Platform.OS === 'android' ? styles.androidImg : styles.topLeftCorner} source={require('../assets/corner.png')}/>
        <Image style={Platform.OS === 'android' ? styles.androidImg : styles.topRightCorner} source={require('../assets/corner.png')}/>
        <Image style={Platform.OS === 'android' ? styles.androidImg : styles.bottomLeftCorner} source={require('../assets/corner.png')}/>
        <Image style={Platform.OS === 'android' ? styles.androidImg : styles.bottomRightCorner} source={require('../assets/corner.png')}/>
			<SearchingAnimation visible={this.state.loadingVisible}/>
         	<FoundAnimation visible={this.state.foundVisible}/>

        </Camera>
        <Toast ref="toast" position="center" />
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

