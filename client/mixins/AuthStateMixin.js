/**
 * Created by KlimMalgin on 21.12.2014.
 */
'use strict';

var Reflux = require('reflux');

var UserStore = require('../stores/User/Store');

var AuthStateMixin = {

    mixins: [
        Reflux.connect(UserStore, 'user'),
        Reflux.listenTo(UserStore, 'onChangeAuth')
    ],

    isAuth: function () {
        return this.state.user
    }

};

module.exports = AuthStateMixin;