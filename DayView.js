'use strict';

var React = require('react-native');

var {
	View,
	Text,
	TouchableOpacity
} = React;

module.exports = React.createClass({
	getInitialState : function(){
		return {
      day : new Date(),
      style : {}
    };
	},
	componentDidMount : function(){
		this.props.addCallback(this.changeStyle);
	},
	changeStyle : function(day, style){
		this.setState({
			day : day,
			style : style
		});
	},
	render : function(){
		return (
			<TouchableOpacity onPress={this.props.selectDay.bind(null, this.state.day)}>
				<View style={this.state.style}>
					<Text>{this.state.day.getDate()}</Text>
				</View>
			</TouchableOpacity>
		);
	}
});
