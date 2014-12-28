/**
 * Created by KlimMalgin on 21.12.2014.
 */
'use strict';

var Option = require('fantasy-options').Option;

var Reflux = require('reflux');
var merge = require('react/lib/merge');

var DropdownActions = require('../actions/DropdownActions');

var ComboBoxItemsStoreCreator = function (config) {
    var Actions = config.Actions(config);

    return Reflux.createStore({
        init: function () {
            //this.items = Option.from([]);

            this.compose = {
                items: Option.of([])
            };

            this.listenTo(DropdownActions.changePhrase, this.handleChangePhrase);
            this.listenTo(Actions.receiveComboBoxItems, this.handleReceiveItems);

            Actions.loadComboBoxItems(Option.from(""));
        },

        getDefaultData: function() {
            return this.compose;
        },

        update : function(compose) {
            this.compose = compose;
            // TODO: При наличии нескольких контролов на странице, все они будут реагировать на это событие. Нужно продумать разделение реакции, чтобы каждый реагировал только на свое событие
            DropdownActions.updateItems(this.compose.items);
            this.trigger(this.compose);
        },

        handleChangePhrase: function (phrase) {
            Actions.loadComboBoxItems(phrase);
        },

        handleReceiveItems: function(data) {
            //this.update(Option.from(data.result));
            this.update({
                items: Option.from(data.result)
            });
        }

    });
};

module.exports = ComboBoxItemsStoreCreator;