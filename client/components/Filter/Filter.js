/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 27.10.2014.
 */
'use strict';

var React = require('react');
var FilterPanel = require('./Panel/Panel');
var TransactionList = require('./List');

var Filter = React.createClass({

    render: function () {
        return (
            <div className="filter">
                Filter block
                <FilterPanel />
                <br />
                <TransactionList />
            </div>
        );
    }

});

module.exports = Filter;