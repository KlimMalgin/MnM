/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 27.10.2014.
 */
'use strict';

var React = require('react');

var Bootstrap = require('react-bootstrap'),
    Row = Bootstrap.Row,
    Col = Bootstrap.Col;

var TransactionForm = require('../Forms/TransactionForm'),
    Filter = require('../Filter/Filter');

var Dashboard = React.createClass({

    render: function () {
        return (
            <div className="dashboard">
                <Row>
                    <Col xs={8} xsOffset={0} sm={8} smOffset={0} md={8} mdOffset={0} lg={8} lgOffset={0}>
                        <TransactionForm />
                    </Col>
                    <Col xs={4} xsOffset={0} sm={4} smOffset={0} md={4} mdOffset={0} lg={4} lgOffset={0}>
                        <Filter />
                    </Col>
                </Row>
            </div>
        );
    }

});

module.exports = Dashboard;