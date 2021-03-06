import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import firebase from 'firebase';
import DateSchedule from './DateSchedule'
class DashboardScreen extends Component {

  render() {
    return (
      <View >
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
        <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
        <DateSchedule/>
      </View>
    );
  }
}
export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});