import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ColorSquare from '../assets/svg/ColorSquare';
import styles from '../Styles/Screens/ResultsScreenStyles';




class ResultsScreen extends Component {

constructor(props) {
    super(props);
}


static navigationOptions = {
		header: null,
  }



  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }


}


const AppNavigator = createStackNavigator({
  QRCodeScreen: {
    screen: ResultsScreen,
  },
});

export default createAppContainer(AppNavigator);
