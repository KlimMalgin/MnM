/**
 * Created by laiff on 17.10.14.
 */
'use strict';
var mapObject = require('react/lib/mapObject');

var l = require('core.lambda'),
    curry = l.curry;

var lens = require('./lens');

var _inherit = function (shape, baseLens) {
    return mapObject(shape, function (_, k) {
        return lens(k, baseLens)
    });
};

module.exports = curry(2, _inherit);