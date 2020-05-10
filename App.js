import React, { Component } from 'react';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation'
import {Text, AsyncStorage, Alert} from "react-native";
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
    state = {
        _sessionExist: false
    };

  componentWillMount(){
    this.validateSession();
  }

   validateSession(){
    try {
        AsyncStorage.getItem('userLogin', (err, value) => {
            if (value !== null) {
                let expiry = new Date(JSON.parse(value).expiryDate);
                let currentTime = new Date();
                if (expiry > currentTime) {
                    this.setState({ _sessionExist: true })
                }
            }
        });
    } catch (error) {
        Alert.alert('Oops', error.message);
    }
  }

  render() {
    return (
        this.state._sessionExist ? <AppContainerApp/> : <AppContainerAuth/>
    );
  }
}
