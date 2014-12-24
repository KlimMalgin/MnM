/**
 * Created by bas on 27.10.2014.
 */
'use strict';

var Reflux = require('reflux');

//var CitiesApi = require('../common/api/CitiesApi');

/*var loadCitiesDef = {
    preEmit : function(name, count, exclude) {
        var phrase = name.getOrElse("");
        if (phrase) {
            CitiesApi.loadCities({
                body: {
                    name: phrase || "",
                    count: count || 50,
                    exclude: exclude || []
                }
            }).done(DropdownActions.receiveCities);
        } else {
            DropdownActions.receiveCities({cities: []});
        }
    }
};*/

var DropdownActions = {
    changePhrase: Reflux.createAction(/*loadCitiesDef*/),

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