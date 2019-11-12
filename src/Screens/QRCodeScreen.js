import React, { Component } from 'react';
import { Button, View, Text, Alert, StyleSheet, TouchableOpacity,} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { RNCamera } from 'react-native-camera';
import CameraScreen from './CameraScreen';


class QRCodeScreen extends Component {

constructor(props) {
    super(props);
    this.state = {
      qrcode: "",
      text: "Hi Adrian!",
      btn_visible: false,
    };
}

static navigationOptions = {
		header: null,
  }
  
   onBarCodeRead = e => {
   if (e.data == "pissme"){
       this.setState({ btn_visible: true});

   }
  };
  
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          flashMode={RNCamera.Constants.FlashMode.on}
          style={styles.preview}
          onBarCodeRead={this.onBarCodeRead}
          ref={cam => (this.camera = cam)}
        >
            
		{this.state.btn_visible?
		<View style={styles.container_column}> 
  		<Text style={styles.text_wellcome}>{this.state.text}</Text>
		<TouchableOpacity style={styles.btn_scan_code} visible={this.state.btn_visible}
		                     onPress={() => this.props.navigation.navigate('CameraScreen')}>
        <Text style={styles.text}>SCAN TEST STRIP</Text>
		</TouchableOpacity>
		</View>
		:
  		null

		}	
		
	
	
       
        
        </RNCamera>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  container_column: {
    flex: 1,
    flexDirection: "column"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
   text_wellcome: {
    	position: 'absolute',
    	alignSelf: 'center',
    	textAlign: 'center',
    	fontFamily: 'Helvetica-Bold',
		top: 150,
        fontSize: 50,
        color: '#000000',
    },
     btn_scan_code: {

		position: 'absolute',
    	padding: 20,
        borderRadius: 5,
        top: 300,
        justifyContent: 'center',
        alignItems: 'center',
    	alignSelf: 'center',
        backgroundColor: '#0099aa',

    },
});


const AppNavigator = createStackNavigator({
  QRCodeScreen: {
    screen: QRCodeScreen,
  },
});

export default createAppContainer(AppNavigator);
