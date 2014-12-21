/** @jsx React.DOM*/
/**
 * Created by bas on 12.11.2014.
 */
'use strict';

var React = require('react');

var hcx = require('../../../utils/hcx');

var Message = React.createClass({

    getDefaultProps: function () {
        return {
            text: '',
            behavior: 'none', // none|focus|static
            type: 'info',     // info|error
            visible: false
        };
    },

    getInitialState: function () {
        return {
            text: '',
            type: 'info',
            behavior: 'none',
            visible: false
        };
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            text: nextProps.text,
            type: nextProps.type,
            behavior: nextProps.behavior,
            visible: nextProps.visible
        });
    },

    renderMessageText: function (text) {
        return typeof text === "string" ? text
            : text.reduce(function(acc, elem) { return acc.concat([elem, <br />]) }, []);
    },

    renderMessage: function() {
        var classes = {
            inputMessage: true,
            info: this.state.type === "info",
            error: this.state.type === "error",
            visible: this.state.visible || this.props.behavior === "static"
        };

        return (
            <div className={hcx(classes)} title={this.props.text}>
                <div className="text">
                    {this.renderMessageText(this.state.text)}
                </div>
            </div>
        );
    },

    renderBackground : function() {
        var classes = {
            info: this.state.type === "info",
            error: this.state.type === "error",
            messageBg: true,
            visible: this.state.visible || this.props.behavior === "static"
        };

        return (
            <div className={hcx(classes)}></div>
        );
    },

    render: function () {
        return (<div className="message-wrap dropdown-plugin">
            {this.renderMessage()}
            {this.renderBackground()}
        </div>);
    }
});

module.exports = Message;