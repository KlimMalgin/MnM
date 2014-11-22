/**
 * Created by KlimMalgin on 11.11.2014.
 */
'use strict';


var Reflux = require('reflux');
var Option = require('fantasy-options').Option;

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
        TransactionApi.filterTransactions({
            body: filterData || {}
        })
            .done(function () {
                console.log('ПОЛУЧЕН НАБОР ТРАНЗАКЦИЙ ', arguments);
            });
    }
};

var DropdownActions = {
    sendTransaction: Reflux.createAction(sendTransactionDef),
    loadTransaction: Reflux.createAction(loadTransactionDef)

};

module.exports = DropdownActions;
