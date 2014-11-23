/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 23.11.2014.
 */
'use strict';

var React = require('react');
var Option = require('fantasy-options').Option;

var Reflux = require('reflux'),
    ListenerMixin = Reflux.ListenerMixin;

var Bootstrap = require('react-bootstrap'),
    Input = Bootstrap.Input;

var UserStore = require('../../stores/User/Store');

var UserActions = require('../../actions/UserActions');

var UserForm = React.createClass({

    mixins: [
        ListenerMixin,
        Reflux.connect(UserStore, 'user')
    ],

    getInitialState: function () {
        return {
            user: Option.None
        };
    },

    componentDidMount: function () {
        UserActions.checkUserLogined();
    },

    renderUserName: function (user) {
        return <span className="login-username">{user.name}</span>;
    },

    renderForm: function () {
        return (
            <div className="user-form">
                You Anonymous.
                <Input type="text" placeholder="username" />
                <Input type="password" placeholder="password" />
            </div>
        );
    },

    renderChain: function () {
        return this.state.user.fold(
            this.renderUserName,
            this.renderForm
        );
    },

    render: function () {
        return this.renderChain();
    }

});

module.exports = UserForm;