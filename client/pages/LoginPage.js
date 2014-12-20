/** @jsx React.DOM*/
/**
 * Created by klim on 14.12.14.
 */

var React = require('react');
var Reflux = require('reflux'),
    ListenerMixin = Reflux.ListenerMixin;

var Option = require('fantasy-options').Option;

var FormModels = require('../common/FormModels'),
    FormMixin = require('../mixins/FormMixin'),
    AuthStateMixin  = require('../mixins/AuthStateMixin');

var InputExtended = require('../plugins/InputExtended');
var Bootstrap = require('react-bootstrap'),
    Button = Bootstrap.Button;

var UserActions = require('../actions/UserActions'),
    RouterActions = require('../actions/RouterActions');

var ValidationStore = require('../stores/ValidationStore'),
    ValidationStatus = require('../constants/AppConstants').ValidationStatus;

var LoginPage = React.createClass({

    mixins: [
        FormMixin,
        ListenerMixin,
        AuthStateMixin,
        Reflux.connect(ValidationStore, 'validation'),
        Reflux.listenTo(ValidationStore, 'validationChange')
    ],

    getInitialState: function () {
        return {
            formValid: false
        };
    },

    getDefaultProps: function () {
        return {
            formModel: FormModels.Login
        };
    },

    componentDidMount: function () {
        this.onChangeAuth();
    },

    onChangeAuth: function () {
        // TODO: Почему is работает некорректно при сравнении с Option.None?
        //this.isAuth().is(Option.None).chain(RouterActions.dashboard);
        this.isAuth().chain(RouterActions.dashboard);
    },

    handleSubmitForm: function (e) {
        e.preventDefault();
        if (this.state.formValid)
            UserActions.loginUser(this.collectFormData());
    },

    validationChange: function () {
        var validateObject = this.checkValidFormData();
        this.setState({
            formValid: validateObject === ValidationStatus.VALID
        });
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
                            <Button type="submit" disabled={!this.state.formValid}>Вход</Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = LoginPage;