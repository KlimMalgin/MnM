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

        this.listenTo(TransactionActions.loadTransaction, this.handleLoadTransactions);
    },

    getDefaultData: function() {
        return this.transactionList;
    },

    update : function(listOption) {
        this.trigger(this.transactionList = listOption);
    },

    handleLoadTransactions: function (listOption) {
        debugger;
        this.update(listOption);
    }

});

module.exports = FilterListStore;