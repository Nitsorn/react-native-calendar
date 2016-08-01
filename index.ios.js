/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Calendar from './calendar';

// const React = require('react-native');
// let {
//   AppRegistry,
//   Component,
//   StyleSheet,
//   Text,
//   View
// } = React;
// const Calendar = require('./calendar.js');

class test extends Component {
  constructor(props){
    super(props);
    this.state = {
      month : new Date()
    }
  }
  onDateChanged(date){

  }
  lastMonth() {
    let month = new Date(this.state.month);
    month.setMonth(month.getMonth() - 1);
    this.setState({month : month});
  }
  nextMonth() {
    let month = new Date(this.state.month);
    month.setMonth(month.getMonth() + 1);
    debugger;
    this.setState({month : month});
  }
  render() {
    debugger;
    return (
      <View style={styles.container}>
        <Text>{this.state.month.getMonth() + 1}</Text>
        <TouchableOpacity onPress={this.lastMonth.bind(this)}>
          <Text>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.nextMonth.bind(this)}>
          <Text>Next</Text>
        </TouchableOpacity>
        <Calendar month={this.state.month} getDayStyle={this.getDayStyle}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('test', () => test);
