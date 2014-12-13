/**
 * Created by KlimMalgin on 23.11.2014.
 */
'use strict';


var xhrTransport = require('../transports/xhr');
var rest = require('../../constants/AppConstants').rest;

var loginUserTransport = xhrTransport({
    method: rest.user.login.type,
    uri: function () {
        return rest.user.login.url;
    }
});

var logoutUserTransport = xhrTransport({
    method: rest.user.logout.type,
    uri: function () {
        return rest.user.logout.url;
    }
});

module.exports = {

    loginUser: function (opts) {
        return loginUserTransport(opts);
    },

    logoutUser: function (opts) {
        return logoutUserTransport(opts);
    }

};