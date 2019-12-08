import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Image
} from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class AnimationScreen extends Component {
  constructor () {
    super()
    this.springValue = new Animated.Value(0.3)
     setInterval(() => {
      this.springValue.setValue(0.3)
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 1,
        tension: 1
      }
    ).start()
    }, 
    // Define any blinking time.
    5000);
  }
  
  
  render () {
    return (
      <View style={styles.container}>
        <Animated.Image
          style={{ width: 227, height: 200, transform: [{scale: this.springValue}] }}
          source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const AppNavigator = createStackNavigator({
  AnimationScreen: {
    screen: AnimationScreen,
  },
});

export default createAppContainer(AppNavigator);
