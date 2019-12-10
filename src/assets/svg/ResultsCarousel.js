import React, { Component,  useState, useEffect } from 'react';

import styled from "styled-components/native"; // 3.1.6
import Carousel from 'react-native-snap-carousel'; // 3.6.0
import { VictoryPie, VictoryChart } from 'victory-native';
import {View, Text,   LayoutAnimation,   Animated, } from 'react-native';
import styles from '../../Styles/Screens/ResultsCarouselStyles';

export default class ResultsCarousel extends Component {

  constructor(props){
    super();
    this.state = {
      errors: []
    }
    this.props = props;
    this._carousel = {};
    this.init();
    this.graphicColor = ['#388087', '#6fb3b8', '#badfe7'];
    this.animationShowed = false;
    setTimeout(() => {
        this.setState({
          graphicData : [{ y: 100, label: " " }, { y: 50, label: " "  }],
          });
          this.startAnimation();

    },
    // Define any blinking time.
    1000);
  }

  startAnimation=()=>{

    Animated.timing(this.state.animation, {
      toValue : 0,
      timing : 0
    }).start(()=>{
      Animated.timing(this.state.animation,{
        toValue : 1,
        duration : 1500
      }).start();
    })
  }


  init(){
    this.state = {
      animation : new Animated.Value(0),
      parameters: [
        {
          id: "Hydration",
          thumbnail: "https://img.youtube.com/vi/D9ioyEvdggk/hqdefault.jpg",
          title: "Led Zeppelin - Stairway To Heaven"
        }, {
          id: "Acidic",
          thumbnail: "https://img.youtube.com/vi/sNPnbI1arSE/hqdefault.jpg",
          title: "Eminem - My Name Is"
        }, {
          id: "Kidneys",
          thumbnail: "https://img.youtube.com/vi/VOgFZfRVaww/hqdefault.jpg",
          title: ""
        }
      ],
      graphicData : [{ y: 0, label: " " }, { y: 50, label: " " }],

    };

  }



  _renderItem = ( {item, index} ) => {
    console.log("rendering,", index, item)
    const animatedStyle ={
      opacity : this.state.animation
    }
    return (
      <View style={styles.container}>
      <Text style={styles.title}>{item.id}</Text>
      <Animated.Text style={[styles.percentage_text, animatedStyle]}>7/10</Animated.Text>

      <VictoryPie  animate={{ duration: 2000 }} data={this.state.graphicData} width={300} height={300} colorScale={this.graphicColor} innerRadius={50} />
    </View>
    );
  }

  render = () => {

    return (
      <CarouselBackgroundView>
        <Carousel


        animate={{ duration: 2000 }}
          ref={ (c) => { this._carousel = c; } }
          data={this.state.parameters}
          renderItem={this._renderItem.bind(this)}
          sliderWidth={400}
          itemWidth={300}
          layout={'default'}
          firstItem={0}
        />
      </CarouselBackgroundView>
    );
  }
}


const CarouselBackgroundView = styled.View`
  background-color: white;
  height: 100%;
  width: 100%;
`
