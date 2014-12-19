/**
 * Created by laiff on 17.10.14.
 */
'use strict';

var Lenses = require('fantasy-lenses'),
    oLens = Lenses.PartialLens.objectLens,
    aLens = Lenses.PartialLens.arrayLens;

var _lensStore = {};

var _buildLens = function (code) {
    if (!_lensStore[code]) {
        var lens = +code === code ? aLens : oLens;
        _lensStore[code] = lens(code);
    }
    return _lensStore[code];
};

var builder = function(path, base) {
    var parsedLenses = path.split('.').map(_buildLens),
        baseLens = !!base && typeof base === 'string' ? _buildLens(base) : base,
        lenses = !!baseLens ? [baseLens].concat(parsedLenses) : parsedLenses;

    return lenses.reduce(function (lst, next) {
        return lst.andThen(next);
    });
};

module.exports = builder;