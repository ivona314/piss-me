import React, { Component,  useState, useEffect } from 'react';

import styled from "styled-components/native"; // 3.1.6
import Carousel from 'react-native-snap-carousel'; // 3.6.0
import { VictoryPie, VictoryChart } from 'victory-native';
import {View, Text,   LayoutAnimation,   Animated, ImageBackground} from 'react-native';
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

    for (var i=0; i<3; i++){
      this.state.parameters[i].data = [{ y: Math.floor(this.props.data[0][0]/10), label: " " }, { y: 100-i*10, label: " "  }];
    }
    setTimeout(() => {
      let oldParams = [...this.state.parameters];
      oldParams[0].initialData = [{ y: 70, label: " " }, { y: 30, label: " "  }],
      this.setState({
        parameters: oldParams

        });
        this.startAnimation(0);

    },
    // Define any blinking time.
    1000);
  }

  startAnimation=(index)=>{

    Animated.timing(this.state.parameters[index].animation, {
      toValue : 0,
      timing : 0
    }).start(()=>{
      Animated.timing(this.state.parameters[index].animation,{
        toValue : 1,
        duration : 800
      }).start();
    })
  }


  init(){
    this.state = {
      parameters: [
        {
          id: "Hydration",
          initialData : [{ y: 0, label: " " }, { y: 100, label: " "  }],
          data : [{ y: 55, label: " " }, { y: 30, label: " "  }],
          description : "Staying hydrated is important to your overall, good health. It helps maintain your temperature, remove waste from your body, and lubricate your joints.",
          animationShown: true,
          animation: new Animated.Value(0),
          backgroundImage: require("../hydration_background.jpg"),

        }, {
          id: "Kidneys",
          initialData : [{ y: 0, label: " " }, { y: 100, label: " "  }],
          data : [{ y: 83, label: " " }, { y: 100, label: " "  }],
          description : "Kidneys have several extremely important functions. Their main tasks are to filter waste substances out of your blood and balance the levels of salts and water in your body.",
          animationShown: false,
          animation: new Animated.Value(0),
          backgroundImage: require("../kidneys_background.jpg"),

        }, {
          id: "Immunity",
          initialData : [{ y: 0, label: " " }, { y: 100, label: " "  }],
          data : [{ y: 90, label: " " }, { y: 100, label: " "  }],
          description : "The immune system defends our body against invaders, such as viruses, bacteria, and foreign bodies.",
          animationShown: false,
          animation: new Animated.Value(0),
          backgroundImage: require("../immunity_background.jpg"),

        }, {
          id: "Energy",
          initialData : [{ y: 0, label: " " }, { y: 100, label: " "  }],
          data : [{ y: 70, label: " " }, { y: 100, label: " "  }],
          description : "Body energy is important for your overall wellness.",
          animationShown: false,
          animation: new Animated.Value(0),
          backgroundImage: require("../energy_background.jpg"),
        }, {
          id: "pH",
          initialData : [{ y: 0, label: " " }, { y: 100, label: " "  }],
          data : [{ y: 90, label: " " }, { y: 100, label: " "  }],
          description : "Your body’s pH balance, also referred to as its acid-base balance: the level of acids and bases in your blood at which your body functions best.",
          animationShown: false,
          animation: new Animated.Value(0),
          backgroundImage: require("../ph_background.jpg"),
        },
      ],

    };

  }



  _renderItem = ( {item, index} ) => {
    console.log("rendering,", index, item)

    const animatedStyle ={
      opacity : this.state.parameters[index].animation
    }

    return (

      <View style={styles.container}>

      <ImageBackground source={item.backgroundImage} style={styles.image_background_style} imageStyle={{ borderRadius: 25 }}>
      <Text style={styles.title}>{item.id}</Text>
      <Animated.Text style={[styles.percentage_text, animatedStyle]}>{item.data[0].y}%</Animated.Text>
      <VictoryPie  animate={{ duration: 2000 }} data={item.initialData} width={300} height={300} colorScale={this.graphicColor} innerRadius={50} />
      <Text style={styles.description_text}>{item.description}</Text>
      </ImageBackground>
      </View>



    );
  }

  carouselSnap(index) {

      if (!this.state.parameters[index].animationShown){
        this.startAnimation(index);
      }

      let oldParams = [...this.state.parameters];
      oldParams[index].initialData = this.state.parameters[index].data,
      oldParams[index].animationShown = true,

      this.setState({
        parameters: oldParams
      });

  }


  render = () => {

    return (
        <Carousel
          style={styles.carousel}
          animate={{ duration: 2000 }}
          ref={ (c) => { this._carousel = c; } }
          data={this.state.parameters}
          renderItem={this._renderItem.bind(this)}
          sliderWidth={400}
          itemWidth={300}
          firstItem={0}
          layout={'default'}
          layoutCardOffset={260}
          onSnapToItem={index => this.carouselSnap(index)}

        />
    );
  }
}


const CarouselBackgroundView = styled.View`
  background-color: white;
  height: 80%;
  width: 80%;
`
