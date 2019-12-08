import React, { Component} from 'react';
import { Text, View, StyleSheet,   LayoutAnimation,   Animated } from 'react-native';


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
        duration : 1000
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

        <Animated.View style={[styles.animatedBox, animatedStyle]} />

      );
    } else {
      return null;
    }


  }

}



const styles = StyleSheet.create({

  animatedBox:
  {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor:'rgb(255, 255, 255)',
  },

});
