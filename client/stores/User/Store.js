/**
 * Created by KlimMalgin on 23.11.2014.
 */
'use strict';

var Reflux = require('reflux');
var Option = require('fantasy-options').Option;

var UserActions = require('../../actions/UserActions');

var UserStore = Reflux.createStore({
    init: function () {
        this.user = Option.from({});

        this.listenTo(UserActions.checkUserLogined, this.handleCheckUserLogined);
    },

    getDefaultData: function() {
        return this.user;
    },

    update : function(user) {
        this.trigger(this.user = user);
    },

    handleCheckUserLogined: function (user) {
        this.update(user);
    }

});

module.exports = UserStore;