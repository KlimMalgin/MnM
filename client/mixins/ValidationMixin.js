/**
 * Created by laiff on 12.09.14.
 */
'use strict';

var React = require('react');

var pt = React.PropTypes;

var ValidationStatus = require('../constants/AppConstants').ValidationStatus;

/**
 *
 * @mixin ValidationMixin
 *
 * @extends ReactCompositeComponentInterface
 *
 */
var ValidationMixin = {

    project : function(fieldName) {
        var validation = this.state.validation[fieldName];
        return {
            messages : function() {
                return validation.messages
            },
            status : function() {
                return validation.status
            },
            value : function () {
                return validation.value
            }
        };
    },
    /**
     * Получить хранимое значение
     *
     * @returns {Validation}
     */
    validation: function () {
        return this.state.validation[this.model().name] || {};
    },

    isValid : function() {
        return this.validation().status === ValidationStatus.VALID
    },

    isInvalid : function() {
        return this.validation().status === ValidationStatus.INVALID
    },

    isValidating : function() {
        return this.validation().status === ValidationStatus.VALIDATING
    },

    isInitial : function() {
        return this.validation().status === ValidationStatus.INITIAL
    }
};

module.exports = ValidationMixin;