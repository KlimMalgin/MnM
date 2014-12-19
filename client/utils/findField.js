/**
 * Created by laiff on 10.10.14.
 */
'use strict';

var find = require('./find');
var FieldModels = require('./../common/FieldModels');

var findField = function(fieldName) {
    return find(function(key) {
        return fieldName === FieldModels[key].name;
    }, Object.keys(FieldModels)).map(function (key) {
        return FieldModels[key];
    });
};

module.exports = findField;