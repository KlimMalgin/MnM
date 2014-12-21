/**
 * Created by KlimMalgin on 21.12.2014.
 */
'use strict';


var Reflux = require('reflux');

var TagsApi = require('../common/api/TagsApi');

var loadTagsDef = {
    preEmit : function(name, count) {
        var phrase = name.getOrElse("");
        if (phrase) {
            TagsApi.loadTags({
                body: {
                    name: phrase || ""/*,
                     count: count || 50*/
                }
            }).done(TagsActions.receiveTags);
        } else {
            TagsActions.receiveTags({data: {results:[]}});
        }
    }
};

var TagsActions = {
    loadTags : Reflux.createAction(loadTagsDef),

    receiveTags : Reflux.createAction()
};

module.exports = TagsActions;