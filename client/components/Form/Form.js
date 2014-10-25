/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 25.10.2014.
 */
'use strict';

var React = require('react');

var Bootstrap = require('react-bootstrap'),
    Row = Bootstrap.Row,
    Col = Bootstrap.Col,
    Input = Bootstrap.Input,
    Button = Bootstrap.Button;

var TagField = require('../../plugins/TagField');

var Form = React.createClass({

    handleClickButton: function () {
        console.log('handleClickButton');
    },

    getTags: function () {
        return ['cat1', 'cat2', 'cato'];
    },

    render: function () {
        return (
            <Row>
                <Col xs={12} xsOffset={0} sm={12} smOffset={0} md={12} mdOffset={0} lg={12} lgOffset={0}>

                    <form className="transaction-form">
                        <Input type="text" placeholder="Категория" />
                        <TagField placeholder="Введите теги" tags={this.getTags()} />
                        <Input type="text" placeholder="Сумма" />
                        <Input type="textarea" placeholder="Описание" />

                        <div className="buttons">
                            <Button onClick={this.handleClickButton} title="Добавить" bsStyle="primary" bsSize="default" className="add-transaction-btn">Добавить</Button>
                        </div>
                    </form>

                </Col>
            </Row>
        );
    }

});

module.exports = Form;