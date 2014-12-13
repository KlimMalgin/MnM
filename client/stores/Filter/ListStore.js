/**
 * Created by KlimMalgin on 22.11.2014.
 */
'use strict';

var merge = require('react/lib/merge');

var Reflux = require('reflux');
var Option = require('fantasy-options').Option;

var TransactionActions = require('../../actions/TransactionActions');

var UserStore = require('../User/Store');

var _requestTransactionMapper = function (user) {
    return Option.from({
        userId: user.objectId
    });
};

var FilterListStore = Reflux.createStore({

    init: function () {
        this.transactionList = Option.from([]);

        this.user = Option.None;

        this.listenTo(TransactionActions.receiveTransactions, this.handleReceiveTransactions);
        this.listenTo(UserStore, this.handleChangeUser);

    },

    getDefaultData: function() {
        return this.transactionList;
    },

    update : function(listOption) {
        this.trigger(this.transactionList = listOption);
    },

    handleReceiveTransactions: function (listOption) {
        this.update(listOption);
    },

    handleChangeUser: function (userOption) {
        this.user = userOption;
        this.requestTransactions();
    },

    requestTransactions: function () {
        this.user.chain(_requestTransactionMapper).fold(TransactionActions.loadTransactions, TransactionActions.clearTransactions);
    }

});

module.exports = FilterListStore;