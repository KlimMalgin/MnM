/**
 * Created by laiff on 17.10.14.
 */
'use strict';

var Option = require('fantasy-options').Option;

/**
 *
 * @param {Store<A>} store Хранилище @see {@link Store}
 * @returns {Option<A>} значение хранимое в сторе в контейнере @see {@link Option}
 */
module.exports = function (store) {
    return Option.from(store.get());
};