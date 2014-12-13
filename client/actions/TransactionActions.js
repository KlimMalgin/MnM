/**
 * Created by KlimMalgin on 11.11.2014.
 */
'use strict';


var Reflux = require('reflux');
var Option = require('fantasy-options').Option;

var ErrorActions = require('./ErrorActions');

var TransactionApi = require('../common/api/transactionApi');

var sendTransactionDef = {
    preEmit : function(transactionData) {
        TransactionApi
            .sendTransaction(transactionData)
            .done(function () {
                console.info("ТРАНЗАКЦИЯ ОТПРАВЛЕНА ", arguments);
            });
    }
};

var loadTransactionDef = {
    preEmit: function (filterData) {
        debugger;
        TransactionApi.filterTransactions({
            body: filterData || {}
        })
        .done(TransactionActions.receiveTransactions, ErrorActions.receiveError);
    }
};

var receiveTransactionDef = {
    preEmit: function (data) {
        return Option.from(data.results);
    }
};

var TransactionActions = {
    sendTransaction: Reflux.createAction(sendTransactionDef),
    loadTransactions: Reflux.createAction(loadTransactionDef),

    receiveTransactions: Reflux.createAction(receiveTransactionDef)
};

module.exports = TransactionActions;
