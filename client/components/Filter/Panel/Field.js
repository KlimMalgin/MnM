/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 22.11.2014.
 */
'use strict';

var React = require('react');

var Bootstrap = require('react-bootstrap'),
    Input = Bootstrap.Input;

var Field = React.createClass({

    render: function () {
        return (
            <div className="search-field">
                <Input type="text" placeholder="filter..." />
            </div>
        );
    }

});

module.exports = Field;