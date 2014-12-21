/**
 * Created by KlimMalgin on 21.12.2014.
 */
'use strict';

var Reflux = require('reflux');
var Option = require('fantasy-options').Option;

var TagsActions = require('../actions/TagsActions'),
    DropdownActions = require('../actions/DropdownActions');

var TagsStore = Reflux.createStore({
    init: function () {
        this.tags = Option.None;

        this.listenTo(TagsActions.receiveTags, this.handleChangeTags);
        this.listenTo(DropdownActions.changePhrase, this.handleChangeDropdownField);

    },

    getDefaultData: function() {
        return this.tags;
    },

    update : function(tags) {
        this.trigger(this.tags = tags);
    },

    handleChangeTags: function (tags) {
        debugger;
        this.update(tags);
    },

    handleChangeDropdownField: function (phrase) {
        TagsActions.loadTags(phrase);
    }

});

module.exports = TagsStore;