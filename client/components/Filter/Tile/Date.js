/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 22.11.2014.
 */
'use strict';

var React = require('react');

var Date = React.createClass({

    render: function () {
        return (
            <div className="date-time">
                <div className="date"></div>
                <div className="time"></div>
            </div>
        );
    }

});

module.exports = Date;