/**
 * Created by bas on 17.11.2014.
 */
'use strict';

var Option = require('fantasy-options').Option;

var Reflux = require('reflux');
var DropdownActions = require('../../actions/DropdownActions');

/**
 * Хранилище. При обновлении значения бросает событие изменения
 *
 */
var FieldFocusStore = Reflux.createStore({

    init: function () {
        this.fieldFocus = false;

        this.listenTo(DropdownActions.enableFieldFocus, this.handleEnableFieldFocus);
        this.listenTo(DropdownActions.disableFieldFocus, this.handleDisableFieldFocus);
    },

    getDefaultData: function() {
        return this.fieldFocus;
    },

    update : function(focus) {
        this.trigger(this.fieldFocus = focus);
    },

    handleEnableFieldFocus: function () {
        this.update(true);
    },

    handleDisableFieldFocus: function () {
        this.update(false);
    }

});

module.exports = FieldFocusStore;