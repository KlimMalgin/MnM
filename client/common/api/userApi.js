/**
 * Created by KlimMalgin on 23.11.2014.
 */
'use strict';


var xhrTransport = require('../transports/xhr');

var loginUserTransport = xhrTransport({
    method: "POST",
    uri: function () {
        return "/user/login";
    }
});

module.exports = {

    loginUser: function (opts) {
        return loginUserTransport(opts);
    }

};