/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 23.11.2014.
 */
'use strict';

var React = require('react');
var LinkedStateMixin = React.addons.LinkedStateMixin;
var Option = require('fantasy-options').Option;

var Reflux = require('reflux'),
    ListenerMixin = Reflux.ListenerMixin;

var Bootstrap = require('react-bootstrap'),
    Input = Bootstrap.Input,
    Button = Bootstrap.Button;

var UserStore = require('../../stores/User/Store');

var UserActions = require('../../actions/UserActions');

var UserForm = React.createClass({

    mixins: [
        ListenerMixin,
        LinkedStateMixin,
        Reflux.connect(UserStore, 'user')
    ],

    getInitialState: function () {
        return {
            user: Option.None,
            // ==
            username: '',
            password: ''
        };
    },

    handleClickLoginButton: function () {
        UserActions.loginUser({
            email: this.state.username,
            password: this.state.password
        });
    },

    handleClickLogoutButton: function () {
        UserActions.logoutUser(this.state.user);
    },

    renderUserName: function (user) {
        return (
            <div className="user-info">
                <span className="login-username">Hi, {user.username}!</span>
                <Button onClick={this.handleClickLogoutButton} >Logout</Button>
            </div>
        );
    },

    renderForm: function () {
        return (
            <div className="user-form">
                You Anonymous.
                <Input type="text" placeholder="username" valueLink={this.linkState('username')} />
                <Input type="password" placeholder="password" valueLink={this.linkState('password')} />
                <Button type="submit" onClick={this.handleClickLoginButton} >Login</Button>
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