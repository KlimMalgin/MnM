/** @jsx React.DOM*/
/**
 * Created by bas on 11.09.2014.
 */
'use strict';

var React = require('react'),
    ReactLink = require('react/lib/ReactLink'),
    merge = require('react/lib/merge'),
    empty = require('react/lib/emptyFunction');

var pt = React.PropTypes;
var lpt = ReactLink.PropTypes;

var Reflux = require('reflux'),
    ListenerMixin = Reflux.ListenerMixin;

var Bootstrap = require('react-bootstrap');

var fa = require('react-font-awesome'),
    Icon = fa.Icon,
    Animate = fa.Animate;

var ValidationActions = require('../actions/ValidationActions');

var ValidationStore = require('../stores/ValidationStore');

var FieldMixin = require('../mixins/FieldMixin'),
    ValidationMixin = require('../mixins/ValidationMixin');

var hcx = require('../utils/hcx');

/**
 * @class InputExtended
 *
 * @mixes FieldMixin
 * @mixes ValidationMixin
 * @mixes ListenerMixin
 */
var InputExtended = React.createClass({

    mixins : [
        FieldMixin,
        ValidationMixin,
        ListenerMixin,
        Reflux.connect(ValidationStore, 'validation'),
        Reflux.listenTo(ValidationStore, 'onValidationChange')],

    getInitialState: function () {
        return {
            message: {
                text: this.props.field.message.text,
                type: this.props.field.message.type,
                behavior: this.props.field.message.behavior,
                visible: false
            },
            type: this.props.field.type
        };
    },

    onValidationChange: function() {
        this.setState({
            message: merge(this.state.message, {
                text: this.isInvalid() ? this.validation().messages : this.props.field.message.text,
                type: this.isInvalid() ? 'error' : this.props.field.message.type,
                behavior: this.isInvalid() ? 'static' : this.props.field.message.behavior
            })
        });
    },

    handleChange: function(value) {
        ValidationActions.validate(this.model(), value);
    },

    handleFocus: function () {
        this.setState({
            message: merge(this.state.message, {visible: true})
        });
    },

    handleTogglePassword: function () {
        var nextType = this.state.type === 'password' ? 'text' : this.props.field.type;

        this.setState({
            type: nextType
        });
    },

    handleBlur: function () {
        ValidationActions.validateAsync(this.model(), this.validation().value);
        this.setState({
            message : merge(this.state.message, {visible: false})
        });
    },

    renderPassToggle: function () {
        var classes = {
            showPass: true,
            visible: this.state.type !== "password"
        };

        if (this.props.field.type === 'password') {
            return (<Icon type="eye" onClick={this.handleTogglePassword} className={hcx(classes)} />);
        }
    },

    renderMessageText: function (text) {
        return typeof text === "string" ? text
                                        : text.reduce(function(acc, elem) { return acc.concat([elem, <br />]) }, []);
    },

    renderMessage: function() {
        var classes = {
            inputMessage: true,
            info: this.state.message.type === "info",
            error: this.state.message.type === "error",
            visible: this.state.message.visible || this.state.message.behavior === "static"
        };

        return (
            <div className={hcx(classes)} title={this.props.field.message.text}>
                <div className="text">
                    {this.renderMessageText(this.state.message.text)}
                </div>
            </div>
        );
    },

    renderBackground : function() {
        var classes = {
            info: this.state.message.type === "info",
            error: this.state.message.type === "error",
            messageBg: true,
            visible: this.state.message.visible || this.state.message.behavior === "static"
        };

        return (
            <div className={hcx(classes)}></div>
        );
    },

    render: function () {
        // TODO filter props.field @laiff
        var InputConfigObject = merge(this.props, merge(this.props.field, {
            type: this.state.type,
            bsStyle: this.state.message.type === "error" ? 'error' : null,
            onFocus: this.state.message.behavior === "focus" ? this.handleFocus : empty,
            onBlur: this.state.message.behavior === "focus" ? this.handleBlur : empty,
            valueLink: {
                value: this.validation().value,
                requestChange: this.handleChange
            },
            addonAfter: this.isValidating() ? (<Icon type="spinner" className="fa-spin" />) : null
        }));
        delete InputConfigObject['field'];
        delete InputConfigObject['message'];
        delete InputConfigObject['validators'];

        return (
            <div className="input-extended">
                {this.renderPassToggle()}
                {this.renderMessage()}
                {this.renderBackground()}
                {Bootstrap.Input(InputConfigObject)}
            </div>
        );
    }
});

module.exports = InputExtended;