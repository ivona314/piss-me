import React, { Component } from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native'

export default class Results extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Results</Text>
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