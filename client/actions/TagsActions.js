/**
 * Created by KlimMalgin on 21.12.2014.
 */
'use strict';


var Reflux = require('reflux');
var Option = require('fantasy-options').Option;
var TagsApi = require('../common/api/TagsApi');
var userConst = require('../constants/AppConstants').lStorage;
var store = require('store');


var ComboBoxActionsCreator = function (config) {
    var FullTextSearch = config.FullTextSearch || false,
        uid = config.uid;

    var loadItemsDef = {
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
                                phrase: phraseValue,
                                fullTextSearch: FullTextSearch
                            }
                        }).done(ActionsObject['receiveComboBoxItems' + uid]);
                    }, function () {
                        // TODO: У Action-сущностей есть метод handler?
                        ActionsObject['receiveComboBoxItems' + uid]({result:[]});
                    });
                },
                function () {
                    ActionsObject['receiveComboBoxItems' + uid]({result:[]});
                }
            );

        }
    };

    var receiveItemsDef = {
        preEmit: function () {

        }
    };

    var ActionsObject = {};
        /*loadComboBoxItems : Reflux.createAction(loadItemsDef),

        receiveComboBoxItems : Reflux.createAction(receiveItemsDef)
    };*/

    ActionsObject['loadComboBoxItems' + uid] = Reflux.createAction(loadItemsDef);
    ActionsObject['receiveComboBoxItems' + uid] = Reflux.createAction(receiveItemsDef);

    return ActionsObject;
};


module.exports = ComboBoxActionsCreator;