/**
 * Created by bas on 27.10.2014.
 */
'use strict';

var Reflux = require('reflux');

var DropdownActions = {
    changePhrase: Reflux.createAction(),

    addTags: Reflux.createAction(),
    removeTag: Reflux.createAction(),
    removeLastTag: Reflux.createAction(),
    receiveCities : Reflux.createAction(),
    clearFocus: Reflux.createAction(),
    nextFocused: Reflux.createAction(),
    prevFocused: Reflux.createAction(),

    updateItems: Reflux.createAction(),

    enableFieldFocus: Reflux.createAction(),
    disableFieldFocus: Reflux.createAction(),

    completePhrase: Reflux.createAction()
};

module.exports = DropdownActions;