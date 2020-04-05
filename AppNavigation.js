import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import {createStackNavigator} from 'react-navigation-stack';
import WelcomeComponent from "./src/Screens/Home";
import ProfileComponent from "./src/Screens/Profile";

class NavigationDrawerStructure extends Component {
    toggleDrawer = () => {
        this.props.navigationProps.toggleDrawer();
    };
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                    <Image
                        source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
                        style={{ width: 25, height: 25, marginLeft: 15 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const FirstActivity_StackNavigator = createStackNavigator({
    Welcome: {
        screen: WelcomeComponent,
        navigationOptions: ({ navigation }) => ({
            title: 'Home',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#FFF',
            },
            headerTintColor: 'black',
        }),
    },
});

const Screen2_StackNavigator = createStackNavigator({
    Profile: {
        screen: ProfileComponent,
        navigationOptions: ({ navigation }) => ({
            title: 'Profile',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#FFF',
            },
            headerTintColor: 'black',
        }),
    },
});

const DrawerNavigatorExample = createDrawerNavigator({
    WelcomeComponent: {
        screen: FirstActivity_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Home',
        },
    },
    ProfileComponent: {
        screen: Screen2_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Profile',
        },
    }
});

export default createAppContainer(DrawerNavigatorExample);