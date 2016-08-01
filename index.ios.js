/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Calendar from './calendar';

var {width, height} = Dimensions.get('window');

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
    this.setState({month : month});
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.month.getMonth() + 1}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={this.lastMonth.bind(this)}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.button}>Prev</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.nextMonth.bind(this)}>
            <View style={[styles.buttonWrapper,styles.next]}>
              <Text style={styles.button}>Next</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

  },
  buttonWrapper: {
    width: 0.5*width,
    alignSelf:'center',
    height: 50,
    backgroundColor: '#B0B0B0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  next: {
    backgroundColor: '#A3A3A3',
  },
  button: {
    color: 'white',
    fontSize: 15,
  }
});

AppRegistry.registerComponent('test', () => test);
