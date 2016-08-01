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
  render() {
    return (
      <View style={styles.container}>


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
