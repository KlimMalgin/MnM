/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 25.10.2014.
 */
'use strict';

var React = require('react/addons'),
    cs = React.addons.classSet;

var Option = require('fantasy-options').Option;

var combinators = require('fantasy-combinators'),
    identity = combinators.identity;

var Header = require('./../components/Header');

var RouterActions = require('../actions/RouterActions');

var AuthStateMixin = require('../mixins/AuthStateMixin');
var ListenerMixin = require('reflux').ListenerMixin;

var Application = React.createClass({

    mixins: [
        ListenerMixin,
        AuthStateMixin
    ],

    componentDidMount: function () {
        this.onChangeAuth();
    },

    onChangeAuth: function () {
        //this.isAuth().is(Option.None).chain(RouterActions.login);
        this.isAuth().fold(identity, RouterActions.login);
    },

    render: function () {
        var classes = {
            application : true
        };

        return (
            <div className={cs(classes)}>
                <Header />
                <div className="area">
                    {this.props.activeRouteHandler()}
                </div>
            </div>
        );
    }

});

module.exports = Application;