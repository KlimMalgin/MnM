/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 22.11.2014.
 */
'use strict';

var React = require('react');

var Field = require('./Field');

var Panel = React.createClass({

    render: function () {
        return (
            <div className="filter-panel">
                <Field />
            </div>
        );
    }

});

module.exports = Panel;