/**
 * Created by bas on 30.10.2014.
 */
'use strict';

var Option = require('fantasy-options').Option;

var Reflux = require('reflux');
var DropdownActions = require('../../actions/DropdownActions');

var PhraseStore = require('./PhraseStore');

var _incrementFocus = function (focusedValue, citiesCountValue) {
    return Option.from(focusedValue < (citiesCountValue - 1) ? focusedValue + 1 : -1);
};

var _decrementFocus = function (focusedValue, citiesCountValue) {
    return Option.from(focusedValue >= 0 ? focusedValue - 1 : citiesCountValue - 1);
};

/**
 * Хранилище. При обновлении значения бросает событие изменения
 *
 */
var FocusedItemStore = Reflux.createStore({

    init: function () {
        this.focused = Option.from(-1);
        this.citiesCount = 0;

        this.listenTo(DropdownActions.nextFocused, this.handleFocusedNext);
        this.listenTo(DropdownActions.prevFocused, this.handleFocusedPrev);
        this.listenTo(DropdownActions.clearFocus,  this.handleFocusClear);
        this.listenTo(DropdownActions.receiveCities, this.handleReceiveCities);

        this.listenTo(DropdownActions.changePhrase, this.handleFocusClear);
    },

    getDefaultData: function() {
        return this.focused;
    },

    update : function() {
        this.trigger(this.focused);
    },

    handleFocusedNext: function () {
        var focused = this.focused.getOrElse(-1);
        this.focused = _incrementFocus(focused, this.citiesCount);
        this.update();
    },

    handleFocusedPrev: function () {
        var focused = this.focused.getOrElse(-1);
        this.focused = _decrementFocus(focused, this.citiesCount);
        this.update();
    },

    handleFocusClear: function () {
        this.focused = Option.from(-1);
        this.update();
    },

    handleReceiveCities: function (data) {
        this.citiesCount = data.cities.length;
    }

});

module.exports = FocusedItemStore;