/**
 * Created by KlimMalgin on 22.11.2014.
 */
'use strict';


var Reflux = require('reflux');
var Option = require('fantasy-options').Option;

var TransactionActions = require('../../actions/TransactionActions');

var FilterListStore = Reflux.createStore({

    init: function () {
        this.transactionList = Option.from([]);

        this.listenTo(TransactionActions.receiveTransactions, this.handleReceiveTransactions);
    },

    getDefaultData: function() {
        return this.transactionList;
    },

    update : function(listOption) {
        this.trigger(this.transactionList = listOption);
    },

    handleReceiveTransactions: function (listOption) {
        this.update(listOption);
    }

});

module.exports = FilterListStore;