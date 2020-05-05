import React, { Component } from 'react';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation'
import {Text, AsyncStorage} from "react-native";
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

const SwitchNavigatorAuth = createSwitchNavigator(
    {
      Auth: AuthNavigation,
      App: AppNavigation
    },
    {
      initialRouteName: 'Auth'
    }
);

const SwitchNavigatorApp = createSwitchNavigator(
    {
        Auth: AuthNavigation,
        App: AppNavigation
    },
    {
        initialRouteName: 'App'
    }
);

const AppContainerAuth = createAppContainer(SwitchNavigatorAuth);
const AppContainerApp = createAppContainer(SwitchNavigatorApp);

export default class App extends Component<> {
  _isExpired = false;

  componentDidMount(){
    if (!this.sessionExists()) {
        this._isExpired = true;
    }
  }

  sessionExists(){
    if (AsyncStorage.getItem("userLogin") !== null && AsyncStorage.getItem("userLogin") !== undefined) {
        AsyncStorage.getItem('userLogin', (err, result) => {
            return JSON.parse(result).expiryDate > new Date().getDate();
        });
    } else {
        return false;
    }
  }

  render() {
    return (
        this._isExpired ? <AppContainerAuth/> : <AppContainerApp/>
    );
  }
}
