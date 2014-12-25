/**
 * Created by KlimMalgin on 21.12.2014.
 */
'use strict';

var Option = require('fantasy-options').Option;

var Reflux = require('reflux');
var merge = require('react/lib/merge');

var DropdownActions = require('../actions/DropdownActions'),
    TagsActions = require('../actions/TagsActions');




var TagsListStore = Reflux.createStore({
    init: function () {
        this.items = Option.from([]);

        this.listenTo(DropdownActions.changePhrase, this.handleChangePhrase);
        this.listenTo(TagsActions.receiveTags, this.handleReceiveTags);

        TagsActions.loadTags(Option.from(""));
    },

    getDefaultData: function() {
        return this.items;
    },

    update : function(items) {
        // TODO: При наличии нескольких контролов на странице, все они будут реагировать на это событие. Нужно продумать разделение реакции, чтобы каждый реагировал только на свое событие
        DropdownActions.updateItems(this.items = items);
        this.trigger(this.items);
    },

    handleChangePhrase: function (phrase) {
        TagsActions.loadTags(phrase);
    },

    handleReceiveTags: function(data) {
        this.update(Option.from(data.results));
    }

});

module.exports = TagsListStore;