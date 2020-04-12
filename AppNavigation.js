import React, { Component } from 'react'
import {View, Image, TouchableOpacity, SafeAreaView, Text, ScrollView, ImageBackground} from 'react-native'
import { createAppContainer } from "react-navigation";
import {createDrawerNavigator, DrawerItems} from "react-navigation-drawer";
import {createStackNavigator} from 'react-navigation-stack';
import WelcomeComponent from "./src/Screens/IntroScreen";
import ProfileComponent from "./src/Screens/Profile";
import Icon from 'react-native-vector-icons/FontAwesome';

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
                backgroundColor: '#D0C9D6',
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
                backgroundColor: '#D0C9D6',
            },
            headerTintColor: 'black',
        }),
    },
});

const CustomDrawerNavigation = (props) => {
    return (
        <ScrollView style={{backgroundColor: '#D0C9D6'}}>
            <ImageBackground source={require("./src/assets/drawer-bbb.jpg")} style={{ width: undefined, padding: 16, paddingTop: 48, height: 250 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 10 }}>
                    <Text style={{color: '#FFF', fontSize: 20, fontWeight: '800' }}>john.doe@example.com</Text>
                </View>
            </ImageBackground>
            <View style={{ flex: 1 }}>
                <DrawerItems {...props} />
            </View>
        </ScrollView>
    );
};

const DrawerNavigatorExample = createDrawerNavigator({
        WelcomeComponent: {
            screen: FirstActivity_StackNavigator,
            navigationOptions: {
                drawerLabel: 'Home',
                drawerIcon: <Icon name="home" style={{ fontSize: 24 }} />,
            },
        },
        ProfileComponent: {
            screen: Screen2_StackNavigator,
            navigationOptions: {
                drawerLabel: 'Profile',
                drawerIcon: <Icon name="user" style={{ fontSize: 24 }} />,
            },
        },
    },
    {
        initialRouteName: 'WelcomeComponent',
        contentComponent: CustomDrawerNavigation,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle'
    }
);

export default createAppContainer(DrawerNavigatorExample);