/**
 * Created by laiff on 22.10.14.
 */
'use strict';

var lens = require('fantasy-lenses').Lens.objectLens;
var pLens = require('fantasy-lenses').PartialLens.objectLens;
var identity = require('fantasy-combinators').identity;
var constant = require('fantasy-combinators').constant;

var keyMirror = require('react/lib/keyMirror'),
    merge = require('react/lib/merge'),
    mapObject = require('react/lib/mapObject');

var withoutProperties = require('../utils/withoutProperties'),
    findField = require('../utils/findField'),
    storeGet = require('../utils/storeGet');

var Reflux = require('reflux');

var ValidationActions = require('../actions/ValidationActions');

var AppConstants = require('../constants/AppConstants');

var ValidationStatus = AppConstants.ValidationStatus;

/**
 * Вспомогательные свойства не отражающиеся на поля формы
 *
 * @type {object}
 * @private
 */
var _reservedProps = keyMirror({
    bodyMessage: null,
    emailInfo: null
});

var ValidationStore = Reflux.createStore({
    init: function () {
        this.validation = {};

        this.listenTo(ValidationActions.clear, this.handleClear);
        this.listenTo(ValidationActions.validate, this.handleValidate);
        this.listenTo(ValidationActions.validateAsync, this.handleValidateAsync);
        this.listenTo(ValidationActions.receiveValid, this.handleReceiveValid);
        this.listenTo(ValidationActions.receiveInvalid, this.handleReceiveInvalid);

    },

    getDefaultData: function () {
        return this.validation;
    },

    /**
     * @param {Validation} validation
     */
    update: function (validation) {
        this.trigger(this.validation = validation);
    },

    handleValidate: function (model, value) {
        var validation = model.validators.sync(value);
        var field = {
            status: validation.isFailure ? ValidationStatus.INVALID : ValidationStatus.VALID,
            messages: validation.orElse(identity),
            value: validation.getOrElse(value)
        };
        this.update(lens(model.name).run(this.validation).set(field));
    },

    handleValidateAsync: function (model, value) {
        if (!model.validators.async) {
            return;
        }
        var field = {
            status: ValidationStatus.VALIDATING,
            messages: [],
            value: value
        };
        model.validators.async(value);
        this.update(lens(model.name).run(this.validation).set(field));
    },

    handleReceiveValid: function (receivedData) {
        var that = this;
        mapObject(withoutProperties(receivedData, _reservedProps), function(value, key) {
            findField(key).map(function(model) {
                that.update(lens(model.name).andThen(lens('status')).run(that.validation).set(ValidationStatus.VALID));
            });
        });
    },

    handleReceiveInvalid: function (receivedData) {
        var that = this;
        mapObject(withoutProperties(receivedData, _reservedProps), function(value, key) {
            findField(key).map(function(model) {
                that.update(lens(model.name).run(that.validation).set(merge(that.validation[model.name], {
                    status: ValidationStatus.INVALID,
                    messages: value
                })));
            });
        });
    },

    handleClear: function() {
        this.update(mapObject(this.validation, function() {
            return {
                status: ValidationStatus.INITIAL,
                messages: [],
                value: ""
            };
        }));
    }
});

module.exports = ValidationStore;