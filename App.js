import React, { Component } from 'react';
import IntroScreen from './src/Screens/IntroScreen';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation'
import CameraScreen from './src/Screens/CameraScreen';
import {Text} from "react-native";
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

const SwitchNavigator = createSwitchNavigator(
    {
      Auth: AuthNavigation,
      App: AppNavigation
    },
    {
      initialRouteName: 'Auth'
    }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default class App extends Component<> {
  render() {
    return (
        <AppContainer/>
    );
  }
}
