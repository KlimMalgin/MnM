/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 23.11.2014.
 */
'use strict';

var React = require('react');

var Header = React.createClass({

    render: function () {
        return (
            <div className="header">
                <div className="auth">You Anonymous.</div>
            </div>
        );
    }

});

module.exports = Header;