import React, { Component} from 'react';
import { Text, View, StyleSheet,   LayoutAnimation,   Animated, } from 'react-native';


export default class WhiteBackground extends Component {
  constructor () {
      super()
      this.animationShowed = false;
      this.springValue = new Animated.Value(0.6)
      this.moveAnimation = new Animated.ValueXY({ x: 0, y: 0 })

    }

    startAnimation = () => {
      setInterval(() => {
        Animated.timing(this.moveAnimation, {
          toValue: {x: 0, y: 1000},
          duration : 1000,

        }).start();
      },
      1600);
      }


      	render() {
      	if (this.props.visible){
          if (!this.animationShowed){
            this.startAnimation();
            this.animationShowed = true;
          }
          return (
            <Animated.View style={{position: 'absolute',
            bottom: 0,
            left: 165,
            right: 165,
            top: 75,
            backgroundColor:'rgb(255, 255, 255)',  transform: [
                 {translateX: this.moveAnimation.x},
                 {translateY: this.moveAnimation.y}
               ]}}/>
          );
          } else {
            return (null);
          }
        }

}
