'use strict';

const React = require('react-native');

const {
	View,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Text,
} = React;

var {width, height} = Dimensions.get('window');


const DayView = require('./DayView.js');

const customDayHeadings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const customMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const selectedDay = null;

function defaultStyle(date,prev,future) {
	var style = [styles.container]
	if (prev)
		style.push(styles.prev)
	if (future)
		style.push(styles.future)
	if (date.toDateString() === (new Date()).toDateString()) {
		style.push(styles.today)
	}
	if (selectedDay && date.toDateString() === selectedDay.toDateString()) {
		style.push(styles.selectedDay)
	}
	return style
}

module.exports = React.createClass({
	propTypes : {
		dayView : React.PropTypes.any,
		getDayStyle : React.PropTypes.func
	},
	getDefaultProps : function(){
		return {
			dayView : DayView,
			getDayStyle : defaultStyle
		};
	},
	getInitialState : function(){
		return {
			month : new Date(),
			callbacks : [],
		};
	},
	componentWillMount : function(){
		let CustomDayView = this.props.dayView;
		var rows = [];

		for (var i = 0; i < 6; i++){
			var columns = [];
			for (var j = 0; j < 7; j++){
				columns.push(<CustomDayView key={i+','+j} day={'1'} addCallback={this.addCallback} selectDay={this.selectDay}/>);
			}
			rows.push(<View key={i} style={styles.weekRow}>{columns}</View>);
		}
		this.setState({rows : rows});
	},
	componentDidMount : function() {
		this.rerender();
	},
	componentWillReceiveProps : function(nextProps) {
		// no longer receiving props but changing state from within
		if (nextProps.month != undefined) {
			this.setState({month : nextProps.month});
		}
	},
	rerender : function() {
		let firstDay = new Date(this.state.month);
		firstDay.setDate(1);
		let lastDay = new Date(this.state.month);
		lastDay.setMonth(lastDay.getMonth() + 1)
		lastDay.setDate(0);

		let slot = firstDay.getDay();
		var countingSlot = slot;

		this.state.callbacks.forEach(function(callback, i) {
			let day = new Date(firstDay);
			if (countingSlot > 0) {
				day.setDate(-(countingSlot-1));
				countingSlot--;
				callback(day, this.props.getDayStyle(day, true, false));
			} else {
				day.setDate(i-(slot-1));
				if (day.getMonth() == firstDay.getMonth()) {
					callback(day, this.props.getDayStyle(day, false, false));
				}
				else
					callback(day, this.props.getDayStyle(day, false, true));
			}
		}.bind(this));
	},
	addCallback : function(callback){
		this.state.callbacks.push(callback);
	},
	selectDay(day) {
		selectedDay = day;
		this.rerender();
		this.props.onSelectDay(day);
	},
	lastMonth() {
    let month = new Date(this.state.month);
    month.setMonth(month.getMonth() - 1);
    this.setState({month : month}, this.rerender);
  },
  nextMonth() {
    let month = new Date(this.state.month);
    month.setMonth(month.getMonth() + 1);
    this.setState({month : month}, this.rerender);
  },
	render : function(){
		return (
			<View style={styles.componentContainer}>
				<View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={this.lastMonth}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.button}>Prev</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.thisMonth}>
            <Text>{customMonthNames[this.state.month.getMonth()]}</Text>
          </View>
          <TouchableOpacity onPress={this.nextMonth}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.button}>Next</Text>
            </View>
          </TouchableOpacity>
        </View>
				<View style={styles.calendar}>
					{this.state.rows}
				</View>
			</View>
		);
	}
});

const styles = StyleSheet.create({
	componentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
	buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonWrapper: {
    width: 0.3*width,
    alignSelf:'center',
    height: 30,
    borderRadius: 20,
    margin: 2,
    backgroundColor: '#B0B0B0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thisMonth: {
    width: 0.3*width,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    color: 'white',
    fontSize: 15,
  },
	calendar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		width: width,
	},
	weekRow: {
		flexDirection: 'row'
	},
	container: {
		backgroundColor: 'white',
		width: width/7,
		height: width/7,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'gray',
		borderWidth: 0,
	},
	prev: {
		backgroundColor: 'whitesmoke',
	},
	future: {
		backgroundColor: 'whitesmoke'
	},
	today: {
		borderWidth: 2
	},
	selectedDay: {
		backgroundColor: '#e2e2e2'
	}

});
