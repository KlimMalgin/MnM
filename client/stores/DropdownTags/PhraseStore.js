/**
 * Created by bas on 29.10.2014.
 */
'use strict';

var Option = require('fantasy-options').Option;

var Reflux = require('reflux');
var DropdownActions = require('../../actions/DropdownActions');

/**
 * Хранилище. При обновлении значения бросает событие изменения
 *
 */
var DropdownPhraseStore = Reflux.createStore({
    init: function () {
        this.phrase = Option.from("");

        this.listenTo(DropdownActions.changePhrase, this.handleChangePhrase);
        this.listenTo(DropdownActions.completePhrase, this.handleChangePhrase);
    },

    getDefaultData: function() {
        return this.phrase;
    },

    update : function(phrase) {
        this.trigger(this.phrase = phrase);
    },

    handleChangePhrase: function (phrase) {
        this.update(phrase);
    }

});

module.exports = DropdownPhraseStore;