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

var FormModels = require('../../common/FormModels');

var TagField = require('../../plugins/TagField');

var TransactionForm = React.createClass({

    mixins: [FormMixin],

    getDefaultProps : function () {
        return {
            formModel: FormModels.TransactionForm
        }
    },

    handleClickButton: function () {
        console.log('Button::Click::CreateTransaction');
        //UserActions.createTransaction(this.collectFormData());
    },

    getTags: function () {
        return ['cat1', 'cat2', 'cato'];
    },

    render: function () {
        return (
            <div className="transaction-form">
                <form>
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

module.exports = TransactionForm;