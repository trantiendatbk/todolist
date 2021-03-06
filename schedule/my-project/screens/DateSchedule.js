import React, { useState } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class DateSchedule extends React.Component {
  //const [date, setDate] = useState(new Date(Date.now()));
  // const [mode, setMode] = useState('date');
  // const [show, setShow] = useState(false);

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === 'ios');
  //   setDate(currentDate);
  // };

  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  constructor(props) {
    super(props)
    this.state = {
      date: new Date(Date.now()),
      result:''
    }
  }

  
 getData = async () => {
  try {
    const result = await AsyncStorage.getItem('result')
    this.setState({result:result})
    if(value !== null) {
      // value previously stored
    }
  } catch(e) {
    // error reading value
  }
}

  handleDate = (event,selectedDate) => {
    this.setState({date: selectedDate})
  }

  
  submit = () => {
    console.log(this.state.date);
    console.log(result.user.uid);
  }

  render() {
    return (
      <View>
        <Text>Ngày đăng ký:</Text>
        <DateTimePicker
          value={this.state.date}
          mode={'datetime'}
          display="inline"
          onChange={this.handleDate}
          minimumDate={new Date(Date.now())} />
        
          <Text>Giờ về:</Text>
          <DateTimePicker
          value={this.state.date}
          mode={'time'}
          display="inline"
          onChange={this.handleDate}
           />
          <Button onPress={this.submit} title ="Confirm">Confirm</Button>
      </View>
    );
  };
}