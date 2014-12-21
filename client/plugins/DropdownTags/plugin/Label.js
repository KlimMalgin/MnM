/** @jsx React.DOM*/
/**
 * Created by bas on 13.11.2014.
 */
'use strict';

var React = require('react');

var Label = React.createClass({

    getInitialState: function () {
        return {
            label: ""
        };
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            label: nextProps.children || ""
        });
    },

    render: function () {
        var output = <span></span>,
            label = this.state.label;

        if (label && label.length) {
            output = (
                <label className="dropdown-plugin control-label">
                    <span>{label}</span>
                </label>
            );
        }
        return output;
    }

});

module.exports = Label;