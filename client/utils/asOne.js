/**
 * Created by laiff on 31.10.14.
 */

/**
 * функция которая из переданной ей на вход функции делает такую,
 * которая игнорирует все переданные ей аргументы, кроме первого
 *
 * @param {function} func
 * @returns {Function}
 */
var asOne = function (func) {
    return function (x) {
        return func(x);
    };
};
module.exports  = asOne;