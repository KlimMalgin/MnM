/**
 * Created by KlimMalgin on 21.12.2014.
 */
'use strict';


var Reflux = require('reflux');
var Option = require('fantasy-options').Option;
var TagsApi = require('../common/api/TagsApi');
var userConst = require('../constants/AppConstants').lStorage;
var store = require('store');

var loadTagsDef = {
    preEmit : function(phrase) {
        var user = Option.from(store.get(userConst.USER));

        phrase
            .isNot(Option.of(""))
            .fold(
                function (phraseValue) {
                    user.fold(function (userObject) {
                        TagsApi.loadTags({
                            body: {
                                userId: userObject.objectId,
                                phrase: phraseValue
                            }
                        }).done(TagsActions.receiveTags);
                    }, function () {
                        // TODO: У Action-сущностей есть метод handler?
                        TagsActions.receiveTags({data: {results:[]}});
                    });
                },
                function () {
                    TagsActions.receiveTags({data: {results:[]}});
                }
            );

    }
};

var TagsActions = {
    loadTags : Reflux.createAction(loadTagsDef),

    receiveTags : Reflux.createAction()
};

module.exports = TagsActions;