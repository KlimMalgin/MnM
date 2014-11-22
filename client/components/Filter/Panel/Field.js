/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 22.11.2014.
 */
'use strict';

var React = require('react');

var Bootstrap = require('react-bootstrap'),
    Input = Bootstrap.Input;

var Field = React.createClass({

    getInitialState: function () {
        return {
            value: ''
        };
    },

    setValue: function (v) {
        /*TransactionActions.loadTransactions({

        });*/
        this.setState({
            value: v
        });
    },

    render: function () {
        var fieldLink = {
            value: this.state.value,
            requestChange: this.setValue
        };

        console.log(this.state.value);

        return (
            <div className="search-field">
                <Input type="text" placeholder="filter..." valueLink={fieldLink} />
            </div>
        );
    }

});

module.exports = Field;