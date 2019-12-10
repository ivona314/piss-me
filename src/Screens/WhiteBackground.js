import React, { Component} from 'react';
import { Text, View, StyleSheet,   LayoutAnimation,   Animated, } from 'react-native';
import styles from '../Styles/Screens/WhiteBackgroundStyles';


export default class WhiteBackground extends Component {

constructor () {
    super();

    this.state={
         animation : new Animated.Value(0),
       }
       this.animationShowed = false;
     }

  startAnimation=()=>{

    Animated.timing(this.state.animation, {
      toValue : 0,
      timing : 0
    }).start(()=>{
      Animated.timing(this.state.animation,{
        toValue : 1,
        duration : 500
      }).start();
    })
  }





	render() {
    const animatedStyle ={
      opacity : this.state.animation
    }
    if (this.props.visible){
      if (!this.animationShowed){
        this.startAnimation();
        this.animationShowed = true;
      }

      return (
        <Animated.View style={[styles.background, animatedStyle]}>
      
        </Animated.View>

      );
    } else {
      return null;
    }


  }

}
