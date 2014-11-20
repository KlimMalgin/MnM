/**
 * Created by KlimMalgin on 11.11.2014.
 */
'use strict';


var xhrTransport = require('../transports/xhr');

var sendTransactionTransport = xhrTransport({
    method: "POST",
    uri: function () {
        return "/transaction";
    }
});

var filterTransactions = xhrTransport({
    method: "POST",
    uri: function () {
        return "/transaction/filter";
    }
});


module.exports = {

    sendTransaction: function (opts) {
        return sendTransactionTransport(opts);
    },

    filterTransactions: function (opts) {
        return filterTransactions(opts);
    }

};