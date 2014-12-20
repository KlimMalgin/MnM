/**
 * Created by laiff on 30.10.14.
 */

var merge = require('react/lib/merge');

function objectReducer (object, reducer) {
    var acc = {};
    for (var property in object) {
        if (object.hasOwnProperty(property))
            acc = merge(acc, reducer(object[property]));
    }
    return acc;
}

function objectToArrayReducer (object, reducer) {
    var acc = [];
    for (var property in object) {
        if (object.hasOwnProperty(property))
            acc = acc.concat([reducer(object[property])]);
    }
    return acc.length === 0 ? null : acc;
}

module.exports = {
    objectReducer: objectReducer,
    objectToArray: objectToArrayReducer
};