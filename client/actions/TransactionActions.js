/**
 * Created by KlimMalgin on 11.11.2014.
 */
'use strict';


var Reflux = require('reflux');

var TransactionApi = require('../common/api/transactionApi');

var sendTransactionDef = {
    preEmit : function(transactionData) {
        TransactionApi
            .sendTransaction(transactionData)
            .done(function () {
                console.info("ТРАНЗАКЦИЯ ОТПРАВЛЕНА", arguments);
                debugger;
            });
    }
};

var DropdownActions = {
    sendTransaction: Reflux.createAction(sendTransactionDef)

};

module.exports = DropdownActions;
