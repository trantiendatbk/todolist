import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import loadingScren from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import firebase from 'firebase';
import {firebaseConfig} from './config';
import AddScreen from './screens/AddScreen';
firebase.initializeApp(firebaseConfig); 

export default class App extends React.Component {
  render(){
    return (
      <AddScreen/>
    );
  }
  
}

const AppSwitchNavigator = createSwitchNavigator({
  loadingScren: loadingScren,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
