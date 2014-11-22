/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 22.11.2014.
 */
'use strict';

var React = require('react');

var Cost = React.createClass({

    render: function () {
        return (
            <div className="cost">{this.props.children}</div>
        );
    }

});

module.exports = Cost;