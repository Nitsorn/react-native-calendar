'use strict';

var React = require('react-native');

var {
	View,
	Text,
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
			<View style={this.state.style}>
				<Text>{this.state.day.getDate()}</Text>
			</View>
		);
	}
});
