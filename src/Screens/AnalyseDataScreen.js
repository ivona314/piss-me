import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
} from 'react-native';
import {Image, Dimensions} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import styles from '../Styles/Screens/CameraScreen';
import ColorSquare from '../assets/svg/ColorSquare';


export default class AnalyseDataScreen extends Component {

 state = {
    
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

  };


	render(){
	
	
	const barData1 = {
      labels: ['Leukocytes',
		'Nitrite',
		],
    
          data: [0.2, 0.45],
    
    
    };
    
    const barData2 = {
      labels: [
		'Protein',
		'pH',
		'Blood',
		],
    
          data: [0.28, 0.80, 0.99],
    
    
    };
    
    const barData3 = {
      labels: [
		'Specific Gravity',
		'Ketone',
		'Glucose',
		],
    
          data: [0.43, 0.50, 0.80],
    
    
    };
   
    
    const config1 = {
      backgroundGradientFrom: '#aa00ff',
      color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
     
    };
    
    const config2 = {
      backgroundGradientFrom: '#ff00aa',
      color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
     
    };
    
    const config3 = {
      backgroundGradientFrom: '#00aa55',
      color: (opacity = 0.3) => `rgba(0, 255, 255, ${opacity})`,
     
    };
		return(
		 <View>
		  <ProgressChart
  			data={barData1}
	  		width={Dimensions.get('window').width-30}   
  			height={130}   
	  		chartConfig={config1}
	style={{
	  marginVertical: 16,
      borderRadius: 16,
      position: 'absolute',
	  top: 100,
	      	alignSelf: 'center',

    }}
		/>
		
		 <ProgressChart
  			data={barData2}
	  		width={Dimensions.get('window').width-30}   
  			height={130}   
	  		chartConfig={config2}
	style={{
	  marginVertical: 16,
      borderRadius: 16,
      position: 'absolute',
	  top: 250,
	      	alignSelf: 'center',

    }}
		/>
		
		 <ProgressChart
  			data={barData3}
	  		width={Dimensions.get('window').width-30}   
  			height={130}   
	  		chartConfig={config3}
	style={{
	  marginVertical: 16,
      borderRadius: 16,
      position: 'absolute',
	  top: 400,
	      	alignSelf: 'center',

    }}
		/>

			 <Text style={styles.text_results}>Adrian,{"\n"}here are your results:</Text>
		<ColorSquare colors={this.state.colors} animation={false} top={30}/>

		  
		  
		
		  
		  
		 </View>
		);
		
	}

}