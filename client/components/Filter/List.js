/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 22.11.2014.
 */
'use strict';

var React = require('react');
var Tile = require('./Tile/Tile');

var Option = require('fantasy-options').Option;

var Reflux = require('reflux'),
    ListenerMixin = Reflux.ListenerMixin;

var TransactionActions = require('../../actions/TransactionActions');
var FilterListStore = require('./../../stores/Filter/ListStore');

var List = React.createClass({

    mixins: [
        ListenerMixin,
        Reflux.connect(FilterListStore, 'transactionList')
    ],

    getInitialState: function () {
        return {
            transactionList: Option.from(null)
        };
    },

    componentDidMount: function () {
        TransactionActions.loadTransaction();
    },

    render: function () {
        console.log(this.state.transactionList);
        return (
            <div>pam-pam</div>
        );
    }

});

module.exports = List;