/**
 * Created by laiff on 12.09.14.
 */
'use strict';

var React = require('react'),
    invariant = require('react/lib/invariant'),
    mapObject = require('react/lib/mapObject');

var pt = React.PropTypes;

var FormState = require('../constants/AppConstants').FormState;

var ValidationActions = require('../actions/ValidationActions');

/**
 *
 * @mixin FormMixin
 *
 * @extends ReactCompositeComponentInterface
 *
 * @type {{
 *      formModel: Function,
 *      collectFormData: Function
 * }}
 */
var FormMixin = {

    propTypes: {
        formModel: pt.any.isRequired // TODO FormModel shape @laiff
    },


    getInitialState: function () {
        return {
            formState: FormState.EDITABLE
        };
    },

    componentDidMount: function () {
    },

    /**
     *
     * @returns {Object}
     */
    formModel : function () {
        return this.props.formModel;
    },

    formState: function () {
        return this.state.formState;
    },

    setFormState: function (formState) {
        this.setState({
            formState: formState
        });
    },

    isFormEditable: function () {
        return this.formState() === FormState.EDITABLE;
    },

    isFormSubmitting: function () {
        return this.formState() === FormState.SUBMITTING;
    },

    isFormSubmitted: function () {
        return this.formState() === FormState.SUBMITTED;
    },

    collectFieldData: function(field) {
        var validation = this.state.validation[field.name];
        return !!validation ? validation.value : null;
    },

    collectFormData: function() {
        return mapObject(this.formModel(), this.collectFieldData);
    },

    clearForm: function() {
        ValidationActions.clear();
    }
};

module.exports = FormMixin;