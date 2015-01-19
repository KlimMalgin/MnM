/**
 * Created by bas on 27.10.2014.
 */
'use strict';

var Reflux = require('reflux');

var DropdownActionsCreator = function(config) {

    return Reflux.createActions.createActions([
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

};

module.exports = DropdownActionsCreator;