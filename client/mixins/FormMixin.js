/**
 * Created by KlimMalgin on 27.10.2014.
 */
'use strict';

var React = require('react'),
    mapObject = require('react/lib/mapObject');

var pt = React.PropTypes;

var FormState = require('../constants/AppConstants').FormState;


var FormMixin = {

    propTypes: {
        formModel: pt.any.isRequired
    },

    getInitialState: function () {
        return {
            formState: FormState.EDITABLE
        };
    },

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

    collectFormData: function() {
        return mapObject(this.formModel(), function(field) {
            return this.state.validation[field.name].value;
        });
    }

};

module.exports = FormMixin;