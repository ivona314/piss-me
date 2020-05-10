import React, { Component } from 'react';
import {Alert, AsyncStorage, StyleSheet, Text, View} from 'react-native'

export default class Logout extends Component {
    componentDidMount(){
        AsyncStorage.removeItem("userLogin");
        Alert.alert('Congrats!', 'You have successfully logged out!');
        this.props.navigation.navigate('Auth')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Logout</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});