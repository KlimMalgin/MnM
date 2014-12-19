/**
 * Created by laiff on 13.11.14.
 */

var thrush = require('fantasy-combinators').thrush(undefined);

module.exports = function (components, renders) {
    return Object
        .keys(components)
        .filter(function (key) {
            return components[key]
        })
        .map(function (key) {
            return renders[key]
        })
        .map(thrush)
};