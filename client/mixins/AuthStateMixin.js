/**
 * Created by KlimMalgin on 21.12.2014.
 */
'use strict';

var Reflux = require('reflux'),
    ListenerMixin = Reflux.ListenerMixin;

var UserStore = require('../stores/User/Store');

var AuthStateMixin = {

    mixins: [
        ListenerMixin,
        Reflux.connect(UserStore, 'user'),
        Reflux.listenTo(UserStore, 'onChangeAuth')
    ],

    isAuth: function () {
        return this.state.user
    }/*,

    onChangeAuth: function () {

    }*/

};

module.exports = AuthStateMixin;