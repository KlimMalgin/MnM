/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 25.10.2014.
 */
'use strict';

var React = require('react');

var Bootstrap = require('react-bootstrap'),
    Input = Bootstrap.Input,
    Button = Bootstrap.Button;

var FormMixin = require('../../mixins/FormMixin');

var TagField = require('../../plugins/TagField');

var Form = React.createClass({

    mixins: [FormMixin],

    handleClickButton: function () {
        console.log('handleClickButton');
    },

    getTags: function () {
        return ['cat1', 'cat2', 'cato'];
    },

    render: function () {
        return (
            <div className="transaction-form">
                <form>
                    <Input type="text" placeholder="Категория" />
                    <TagField placeholder="Введите теги" tags={this.getTags()} />
                    <Input type="text" placeholder="Сумма" />
                    <Input type="textarea" placeholder="Описание" />

                    <div className="buttons">
                        <Button onClick={this.handleClickButton} title="Добавить" bsStyle="primary" bsSize="default" className="add-transaction-btn">Добавить</Button>
                    </div>
                </form>
            </div>
        );
    }

});

module.exports = Form;