/**
 * Created by bas on 27.10.2014.
 */
'use strict';


var Option = require('fantasy-options').Option;

var Reflux = require('reflux');
var merge = require('react/lib/merge');

var l = require('core.lambda'),
    curry = l.curry;

var ops = require('core.operators'),
    equal = ops.equal,
    prop = ops.get;

var storeGet = require('../../utils/storeGet'),
    pLens = require('../../utils/lens'),
    find = require('../../utils/find');

var lens = require('fantasy-lenses').Lens.objectLens;

var DropdownActions = require('../../actions/DropdownActions');

var FocusedStore = require('./FocusedStore');
var PhraseStore = require('./PhraseStore');


var _mapValues = function(xs) {
    return xs.map(function(city) {
        return merge(city, {
            name: city.name.toLowerCase(),
            city: city.code
        })
    });
};

var _updater = function (context, cities, phrase) {
    context.composed = {
        cities: cities,
        phrase: phrase === null ? context.composed.phrase : phrase
    };
};

var _createCitiesOption = function (arr) {
    return arr && arr.length ? Option.from(arr) : Option.None;
};

var _IfFocusNonActive = function (val) {
    return val.chain(function (v) { return v; }) === -1 ? val : Option.None;
};

var _IfCitiesNotEmpty = function (val) {
    return val.chain(function (v) { return v; }).length > 0 ? val : Option.None;
};

var _IfFocusActive = function (val) {
    return val.chain(function (v) { return v; }) >=0 ? Option.from(val) : Option.None;
};

var _hintCreator = curry(4, function (context, citiesValue, phraseValue, focusValue) {
    return function hintCreator () {
        var result = "";
        if (focusValue > 0) {
            result = "";
        } else {
            result = citiesValue[focusValue].name.substr(phraseValue.length);
        }

        context.composed.hint = Option.from(result);
    };
});

var _hintEmptifier = curry(1, function (context) {
    return function hintEmptifier () {
        context.composed.hint = Option.from("");
    };
});

var _phraseCreator = curry(4, function (context, citiesValue, phraseValue, focusValue) {
    return function phraseCreator () {
        var result = "";
        _hintCreator(context, citiesValue, phraseValue, focusValue)();

        if (focusValue > 0) {
            result = citiesValue[focusValue].name;
        } else {
            result = phraseValue;
        }

        context.composed.phrase = Option.from(result + context.composed.hint.getOrElse(""));
        context.composed.hint = Option.from("");
    };
});

/**
 * Хранилище. При обновлении значения бросает событие изменения
 *
 */
var DropdownCitiesStore = Reflux.createStore({
    init: function () {
        this.composed = {
            cities: Option.from([]),
            phrase: Option.from(""),
            hint: Option.from("")
        };

        this._focused = Option.from(-1);

        this.listenTo(DropdownActions.receiveCities, this.handleReceiveCities);
        this.listenTo(DropdownActions.changePhrase, this.handleChangePhrase);
        this.listenTo(DropdownActions.completePhrase, this.handleCompletePhrase);

        this.listenTo(FocusedStore, this.handleChangeFocus);

        this.calcPhrase = _phraseCreator(this);
        this.calcHint = _hintCreator(this);
        this.emptyHint = _hintEmptifier(this);
    },

    getDefaultData: function() {
        return this.composed;
    },

    update : function() {
        this.createHint();
        this.trigger(this.composed);
    },

    handleReceiveCities: function(data) {
        var cities = pLens('cities').run(data).chain(storeGet).map(_mapValues).getOrElse([]);
        _updater(this, _createCitiesOption(cities), null);
        this.update();
    },

    handleChangePhrase: function (phrase) {
        _updater(this, this.composed.cities, phrase);
        this.update();
    },

    handleCompletePhrase: function () {
        this.emptyHint();
        if (this._focused.getOrElse(-1) === -1) {
            DropdownActions.nextFocused();
        }
        this.update();
    },

    handleChangeFocus: function (focusOption) {
        this._focused = focusOption;
        var that = this,
            citiesOption = this.composed.cities,
            phraseValue = this.composed.phrase.getOrElse(""),

            /**
             * Если элемент не выбран - вернем ноль, чтобы использовать
             * нулевой элемент для автокомплита, если выбран - используем
             * выбранный для завершения введенной фразы
             */
            focusValue   = this._focused.chain(function (val) {
                return val <= 0 ? 0 : val;
            });

        _IfCitiesNotEmpty(citiesOption).chain(function (citiesValue) {
            _IfFocusActive(that._focused)
                .fold(
                that.calcPhrase(citiesValue, phraseValue, focusValue),
                function () {}
            );

        });
        this.update();
    },

    createHint: function () {
        var that = this,
            citiesOption = this.composed.cities,
            phraseValue = this.composed.phrase.getOrElse(""),

            /**
             * Если элемент не выбран - вернем ноль, чтобы использовать
             * нулевой элемент для автокомплита, если выбран - используем
             * выбранный для завершения введенной фразы
             */
            focusValue = this._focused.chain(function (val) {
                return val <= 0 ? 0 : val;
            });

        _IfCitiesNotEmpty(citiesOption)
            .fold(
                function (citiesValue) {
                    _IfFocusNonActive(that._focused)
                        .fold(
                        that.calcHint(citiesValue, phraseValue, focusValue),
                        that.emptyHint
                    );
                },
                this.emptyHint
            );
    }

});

module.exports = DropdownCitiesStore;