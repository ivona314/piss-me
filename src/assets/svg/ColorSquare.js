import React, { Component } from 'react';
import { Text, View, StyleSheet,   LayoutAnimation,   Animated, Easing } from 'react-native';


export default class ColorSquare extends Component {

constructor () {
    super()
    this.animationShowed = false;
    this.springValue = new Animated.Value(0.6)
    this.moveAnimation = new Animated.ValueXY({ x: 0, y: 45 })

  }

  startAnimation = () => {
    setInterval(() => {
      Animated.timing(this.moveAnimation, {
        toValue: {x: 0, y: 45},
        duration : 1800,

      }).start();
    },
    1000);
    }

createSquares = () => {
    let squares = []
    for (let i = 0; i < 12; i++) {
      squares.push(<View style={{position: 'absolute',
	     top: i*30+10,
       left: 76,
       width:22,
       height: 22,
       backgroundColor:this.props.colors[i]}}/>)
    }
    return squares
  }


	render() {
	if (this.props.visible){
    if (!this.animationShowed){
      this.startAnimation();
      this.animationShowed = true;
    }
    return (
    <Animated.View style={{position: 'absolute',
	   top: 30,
     left: 100,
     transform: [
         {translateX: this.moveAnimation.x},
         {translateY: this.moveAnimation.y}
       ]
     }}>
      {this.createSquares()}
    </Animated.View>);
    } else {
      return (null);
    }
  }

}
