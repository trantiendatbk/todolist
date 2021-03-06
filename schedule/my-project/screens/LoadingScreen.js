import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as firebase from "firebase";

export default class LoadingScreen extends Component {

    componentDidMount() {
        this.checkIfLoggedin();
    }

    checkIfLoggedin = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('DashboardScreen');
            } else {
                this.props.navigation.navigate('LoginScreen');
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})