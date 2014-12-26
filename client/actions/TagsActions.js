/**
 * Created by KlimMalgin on 21.12.2014.
 */
'use strict';


var Reflux = require('reflux');
var Option = require('fantasy-options').Option;
var TagsApi = require('../common/api/TagsApi');
var userConst = require('../constants/AppConstants').lStorage;

var loadTagsDef = {
    preEmit : function(phrase) {
        var user = Option.from(store.get(userConst.USER));

        phrase.chain(function (phraseValue) {
            user.fold(function (userObject) {
                TagsApi.loadTags({
                    body: {
                        userId: userObject.objectId,
                        phrase: phraseValue
                    }
                }).done(TagsActions.receiveTags);
            }, function () {
                TagsActions.receiveTags({data: {results:[]}});
            });
        });

    }
};

var TagsActions = {
    loadTags : Reflux.createAction(loadTagsDef),

    receiveTags : Reflux.createAction()
};

module.exports = TagsActions;