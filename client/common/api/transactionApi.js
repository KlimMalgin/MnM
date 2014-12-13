/**
 * Created by KlimMalgin on 11.11.2014.
 */
'use strict';

var xhrTransport = require('../transports/xhr');
var rest = require('../../constants/AppConstants').rest;

var sendTransactionTransport = xhrTransport({
    method: rest.transaction.type,
    uri: function () {
        return rest.transaction.url;
    }
});

var filterTransactions = xhrTransport({
    method: rest.transaction.filter.type,
    uri: function () {
        return rest.transaction.filter.url;
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