/**
 * Created by KlimMalgin on 21.12.2014.
 */
'use strict';

var Option = require('fantasy-options').Option;

var Reflux = require('reflux');
var merge = require('react/lib/merge');

var storeGet = require('../utils/storeGet'),
    pLens = require('../utils/lens');

var lens = require('fantasy-lenses').Lens.objectLens;

var DropdownActions = require('../actions/DropdownActions'),
    TagsActions = require('../actions/TagsActions');




var TagsStore = Reflux.createStore({
    init: function () {
        this.items = Option.from([]);

        //this.listenTo(DropdownActions.receiveCities, this.handleReceiveCities);
        this.listenTo(TagsActions.receiveTags, this.handleReceiveTags);
    },

    getDefaultData: function() {
        return this.items;
    },

    update : function(items) {
        // TODO: При наличии нескольких контролов на странице, все они будут реагировать на это событие. Нужно продумать разделение реакции, чтобы каждый реагировал только на свое событие
        DropdownActions.updateItems(this.items = items);
        this.trigger(this.items);
    },

    handleReceiveTags: function(data) {
        //var cities = pLens('cities').run(data).chain(storeGet).map(_mapValues).getOrElse([]);
        debugger;
        var s = pLens('data.results').run(data).chain(storeGet);
        var p = lens('data.results').run(data);

        this.update(data);
    }

});

module.exports = TagsStore;