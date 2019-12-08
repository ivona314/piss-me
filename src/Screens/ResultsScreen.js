import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ColorSquare from '../assets/svg/ColorSquare';




class ResultsScreen extends Component {

constructor(props) {
    super(props);
}

state = {
  foundVisible: false,
  loadingVisible: true,
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
}

static navigationOptions = {
		header: null,
  }



  render() {
    return (
      <View style={styles.container}>
      <ColorSquare colors={this.state.colors} animation={false} top={30}/>

      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },


});



const AppNavigator = createStackNavigator({
  QRCodeScreen: {
    screen: ResultsScreen,
  },
});

export default createAppContainer(AppNavigator);
