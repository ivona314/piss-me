import { createStackNavigator } from 'react-navigation-stack'
import React from 'react';

import Signup from "./src/Screens/Signup";
import Login from "./src/Screens/Login";

const AuthNavigation = createStackNavigator(
    {
        Login: { screen: Login },
        Signup: { screen: Signup }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
);

export default AuthNavigation