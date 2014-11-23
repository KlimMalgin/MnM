/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 23.11.2014.
 */
'use strict';

var React = require('react');

var UserForm = require('./User/UserForm');

var Header = React.createClass({

    render: function () {
        return (
            <div className="header">
                <div className="auth">
                    <UserForm />
                </div>
            </div>
        );
    }

});

module.exports = Header;