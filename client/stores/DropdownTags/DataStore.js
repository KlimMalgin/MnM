/**
 * Created by KlimMalgin on 24.12.2014.
 */
'use strict';

var Option = require('fantasy-options').Option;

var Reflux = require('reflux');
var merge = require('react/lib/merge');

var storeGet = require('../../utils/storeGet'),
    pLens = require('../../utils/lens');

var DropdownActions = require('../../actions/DropdownActions');

var _mapValues = function(xs) {
    return xs.map(function(city) {
        return merge(city, {
            name: city.name.toLowerCase(),
            city: city.code
        })
    });
};

var _createCitiesOption = function (arr) {
    return arr && arr.length ? Option.from(arr) : Option.None;
};

/**
 * Хранилище. При обновлении значения бросает событие изменения
 *
 */
var DataStore = Reflux.createStore({
    init: function () {

        // TODO: Раньше поле называлось cities. Могут быть несовпадения по именам в Dropdown
        this.items = Option.from([]);

        this.listenTo(DropdownActions.receiveCities, this.handleReceiveCities);
    },

    getDefaultData: function() {
        return this.items;
    },

    update : function(items) {
        DropdownActions.updateItems(this.items = items);
        this.trigger(this.items);
    },

    handleReceiveCities: function(data) {
        var cities = pLens('cities').run(data).chain(storeGet).map(_mapValues).getOrElse([]);
        this.update(_createCitiesOption(cities));
    }

});

module.exports = DataStore;