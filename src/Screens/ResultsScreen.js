import React, { Component } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ResultsCarousel from '../assets/svg/ResultsCarousel';
import styles from '../Styles/Screens/ResultsScreenStyles';




class ResultsScreen extends Component {

constructor(props) {
    super(props);

}


static navigationOptions = {
		header: null,
  }



  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ResultsCarousel data={this.props.navigation.state.params.data}/>
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
