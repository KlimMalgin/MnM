/**
 * Created by bas on 06.11.2014.
 */
'use strict';

var Reflux = require('reflux');
//var DropdownActions = require('../../actions/DropdownActions');

/**
 *
 */

var TagsStoreCreator = function(config) {
    var uid = config.uid;

    return Reflux.createStore({
        init: function () {
            this.tags = [];
            this.listenTo(config.DropdownActions['addTags' + uid], this.handleTagAdded);
            this.listenTo(config.DropdownActions['removeTag' + uid], this.handleTagRemoved);
            this.listenTo(config.DropdownActions['removeLastTag' + uid], this.handleRemoveLastTag);
        },

        getDefaultData: function() {
            return this.tags;
        },

        update : function(tags) {
            this.trigger(this.tags = tags);
        },

        handleTagAdded: function (tagName, isCustomTag) {
            this.update(this.tags.concat([{
                name: tagName,
                custom: !!isCustomTag
            }]));
        },

        handleTagRemoved: function (tag) {
            var tags = this.tags,
                ln = tags.length;

            for (var i = 0; i < ln; i++) {
                if (tags[i].name === tag) {
                    tags.splice(i, 1);
                    break;
                }
            }

            this.update(tags);
        },

        handleRemoveLastTag: function () {
            this.tags.splice(this.tags.length-1, 1);
            this.update(this.tags);
        }

    });
};

module.exports = TagsStoreCreator;