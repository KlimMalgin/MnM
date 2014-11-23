/**
 * Created by KlimMalgin on 23.11.2014.
 */
'use strict';

var Reflux = require('reflux');
var Option = require('fantasy-options').Option;

var UserActions = require('../../actions/UserActions');

var UserStore = Reflux.createStore({
    init: function () {
        this.user = Option.from(null);

        this.listenTo(UserActions.checkUserLogined, this.handleCheckUserLogined);
        this.listenTo(UserActions.loginUserSuccess, this.handleLoginUserSuccess);
        this.listenTo(UserActions.loginUserError, this.handleLoginUserError);
    },

    getDefaultData: function() {
        return this.user;
    },

    update : function(userOption) {
        this.trigger(this.user = userOption);
    },

    handleCheckUserLogined: function (userOption) {
        this.update(userOption);
    },

    handleLoginUserSuccess: function (userOption) {
        this.update(userOption);
    },

    handleLoginUserError: function (userOption) {
        this.update(userOption);
    }

});

module.exports = UserStore;