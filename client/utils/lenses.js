/**
 * Created by laiff on 17.10.14.
 */
'use strict';

var mapObject = require('react/lib/mapObject');

var lens = require('./lens');

var lenses = function(shape) {
    return mapObject(shape, function(_, k) {
        return lens(k);
    });
};

module.exports = lenses;