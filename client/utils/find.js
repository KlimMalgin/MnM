/**
 * Created by laiff on 09.10.14.
 */
'use strict';

var Option = require('fantasy-options').Option;

/**
 *
 * @param {Function<Any -> boolean>} predicate
 * @param {Array<Any>} xs
 * @returns {Option<Any>}
 */
var find = function (predicate, xs) {
    return xs.reduce(function (result, x) {
        return result.fold(function () {
            return result
        }, function () {
            return predicate(x) ? Option.Some(x)
                                : Option.None
        })
    }, Option.None);
};

module.exports = find;