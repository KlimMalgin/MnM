/**
 * Created by bas on 27.10.2014.
 */
'use strict';

var Reflux = require('reflux');

var DropdownActionsCreator = function(config) {

    var Actions = Reflux.createActions.createActions([
        'changePhrase',

        'addTags',
        'removeTag',
        'removeLastTag',
        'receiveCities',
        'clearFocus',
        'nextFocused',
        'prevFocused',

        'updateItems',

        'enableFieldFocus',
        'disableFieldFocus',

        'completePhrase'
    ].map(function(item) {
        return item + config.uid;
    }));

    for (var key in Actions) {
        if (!Actions.hasOwnProperty(key)) continue;
        Actions[key].preEmit = (function(k) {
            return function () {
                console.info('Key: %o', k);
            };
        })(key);
    }

    return Actions;
};

module.exports = DropdownActionsCreator;