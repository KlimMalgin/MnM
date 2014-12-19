/** @jsx React.DOM*/
/**
 * Created by klim on 14.12.14.
 */

var React = require('react');
var Option = require('fantasy-options').Option;

var FormModels = require('../common/FormModels');
var FormMixin = require('../mixins/FormMixin');

var InputExtended = require('../plugins/InputExtended');
var Bootstrap = require('react-bootstrap'),
    Button = Bootstrap.Button;

var LoginPage = React.createClass({

    mixins: [
        FormMixin
    ],

    getDefaultProps: function () {
        return {
            formModel: FormModels.Login
        };
    },

    render: function () {
        return (
            <div className="login-page">
                <div className="panel panel-default auth-panel">
                    <div className="panel-body">
                    <h4>Введите данные для входа: </h4>
                        <InputExtended field={this.formModel().email} />
                        <InputExtended field={this.formModel().password} />
                        <Button>Вход</Button>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = LoginPage;