/**
 * Created by laiff on 17.10.14.
 */
'use strict';

var mapObject = require('react/lib/mapObject');
var prop = require('core.operators').get;

var accessors = function(shape) {
    return mapObject(shape, function(_, k) {
        return function(x) {
            return x[k];
        };
    });
};

module.exports = accessors;