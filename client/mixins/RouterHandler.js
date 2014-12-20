/**
 * Created by KlimMalgin on 20.12.2014.
 */
'use strict';

var Reflux = require('reflux'),
    ListenerMixin = Reflux.ListenerMixin;

var Router = require('react-router'),
    Navigation = Router.Navigation;

var RouterActions = require('../actions/RouterActions');

var RouteHandler = {

    mixins: [
        Navigation,
        ListenerMixin,
        Reflux.listenToMany(RouterActions)
    ],

    updatePath: function(path) {
        this.replaceWith(path);
    },

    login: function() {
        this.transitionTo("/login");
    },

    dashboard: function() {
        this.transitionTo("/dashboard");
    }
};

module.exports = RouteHandler;