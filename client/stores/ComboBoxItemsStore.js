/**
 * Created by KlimMalgin on 21.12.2014.
 */
'use strict';

var Option = require('fantasy-options').Option;

var Reflux = require('reflux');
var merge = require('react/lib/merge');

//var DropdownActions = require('../actions/DropdownActions');

var ComboBoxItemsStoreCreator = function (config) {
    var Actions = config.ComboBoxItemsActions,
        uid = config.uid;

    return Reflux.createStore({
        init: function () {
            this.compose = {
                items: Option.of([])
            };

            this.listenTo(config.DropdownActions['changePhrase' + uid], this.handleChangePhrase);
            this.listenTo(Actions['receiveComboBoxItems' + uid], this.handleReceiveItems);

            Actions['loadComboBoxItems' + uid](Option.from(""));
        },

        getDefaultData: function() {
            return this.compose;
        },

        update : function(compose) {
            this.compose = compose;
            // TODO: При наличии нескольких контролов на странице, все они будут реагировать на это событие. Нужно продумать разделение реакции, чтобы каждый реагировал только на свое событие
            config.DropdownActions['updateItems' + uid](this.compose.items);
            this.trigger(this.compose);
        },

        handleChangePhrase: function (phrase) {
            Actions['loadComboBoxItems' + uid](phrase);
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