/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 22.11.2014.
 */
'use strict';

var React = require('react');

var Description = React.createClass({

    render: function () {
        return (
            <div className="description">{this.props.children}</div>
        );
    }

});

module.exports = Description;