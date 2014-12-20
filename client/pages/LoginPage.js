/** @jsx React.DOM*/
/**
 * Created by klim on 14.12.14.
 */

var React = require('react');
var Reflux = require('reflux'),
    ListenerMixin = Reflux.ListenerMixin;

var Option = require('fantasy-options').Option;

var FormModels = require('../common/FormModels');
var FormMixin = require('../mixins/FormMixin');

var InputExtended = require('../plugins/InputExtended');
var Bootstrap = require('react-bootstrap'),
    Button = Bootstrap.Button;

var UserActions = require('../actions/UserActions');

var ValidationStore = require('../stores/ValidationStore');

var LoginPage = React.createClass({

    mixins: [
        FormMixin,
        ListenerMixin,
        Reflux.connect(ValidationStore, 'validation')
    ],

    getDefaultProps: function () {
        return {
            formModel: FormModels.Login
        };
    },

    handleSubmitForm: function (e) {
        e.preventDefault();
        var data = this.collectFormData();
        console.log("state: %o | object: %o", this.formState(), data);
    },

    render: function () {
        return (
            <div className="login-page">
                <div className="panel panel-default auth-panel">
                    <div className="panel-body">
                    <h4>Введите данные для входа: </h4>
                        <form className="page-login-form" onSubmit={this.handleSubmitForm}>
                            <InputExtended field={this.formModel().email} />
                            <InputExtended field={this.formModel().password} />
                            <Button type="submit">Вход</Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = LoginPage;