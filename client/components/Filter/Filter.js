/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 27.10.2014.
 */
'use strict';

var React = require('react');

var transactionApi = require('../../common/api/transactionApi');

var Bootstrap = require('react-bootstrap'),
    Button = Bootstrap.Button;

var Filter = React.createClass({

    handleClickButton: function () {
        transactionApi.filterTransactions({
            body: {
                objectId: "eESgSA0HzA"
            }
        })
        .done(function () {
                console.log(arguments);
            });
    },

    render: function () {
        return (
            <div className="filter">
                Filter block
                <Button onClick={this.handleClickButton} title="FILTER" bsStyle="primary" bsSize="default" className="test-filter-btn">FILTER</Button>
            </div>
        );
    }

});

module.exports = Filter;