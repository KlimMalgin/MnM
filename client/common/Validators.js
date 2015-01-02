/**
 * Created by laiff on 16.09.14.
 */
'use strict';

var merge = require('react/lib/merge');

var lambda = require('core.lambda'),
    curry = lambda.curry,
    constant = lambda.constant;

var ops = require('core.operators'),
    equal = ops.equal,
    gt = ops.greaterThan,
    gte = ops.greaterOrEqualTo,
    lt = ops.lessThan,
    lte = ops.lessOrEqualTo,
    typeOf = ops.typeOf;

var Validation = require('data.validation'),
    Success = Validation.Success,
    Failure = Validation.Failure;

var ValidationActions = require('../actions/ValidationActions');

/**
 *
 * @param {string} value
 * @returns {number} length of string
 */
var stringLength = function(value) {
    return !!value && typeof value === "string" && value.trim().length || -1;
};

var arrayLength = function(value) {
    return !!value && typeof value === "object" && value.length || -1;
};

var isNotEmptyString = function(value) {
    return stringLength(value) > 0;
};

var isNotEmptyArray = function(value) {
    return arrayLength(value) > 0;
};

/**
 * Возвращает карированную функцию для валидации по предикату
 *
 * @param {Function} predicate
 * @param {Function} message
 * @param {*} value
 *
 * @returns {Validation} результат валидации
 */
var predicateValidator = curry(3, function (predicate, message, value) {
    return predicate(value) ? Success(value)
        : Failure(message(value));
});

/**
 * Выражение для валидации корректности введенного email
 *
 * @type {RegExp}
 */
var isEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Выражение для проверки сложности пароля
 *
 * @type {RegExp}
 */
var isPasswordStrongEnough = /[\W]/;

/**
 * Сообщение для заполненности поля
 *
 * @type {Function}
 * @param value
 * @returns {*[]}
 */
var requiredMessage = constant(["Поле должно быть заполнено"]);

var requiredItemsMessage = constant(["Выберите одно или несколько значений, либо введите свое"]);

/**
 *
 * @param value
 * @returns {*[]}
 */
var emailMessage = function(value) {
    return ['Указанный адрес `' + value + '` некорректен'];
};

/**
 *
 * @param value
 * @returns {*[]}
 */
var passwordStrongEnoughMessage = constant(['Пароль должен содержать специальные символы']);

/**
 * @type {Function}
 */
var lengthValidator= curry(5, function(extract, op, name, length, value) {
    return op(extract(value))(length)   ? Success(value)
        : Failure(['Длинна должна быть ' + name + ' `' + length + '`']);
});

var callValidateApi = curry(3, function(name, action, value) {
    var opts = { body : {}};
    if (equal('object')(typeOf(value))) {
        opts.body = value
    } else if (equal('string')(typeOf(value))) {
        opts.body[name] = value;
    }
    return action(opts);
});

//TODO Memoize numbers @laiff
var valueFunc = curry(2, function(count, value) {
    return curry(count, function() {
        return value;
    })
});

var ap = curry(2, function (validators, value) {
    return validators.reduce(function(validation, validator){
        return validation.ap(validator(value));
    }, new Success(valueFunc(validators.length, value)));
});

var Validators = {

    // Sync
    optional                : predicateValidator(constant(true))(''),
    required                : predicateValidator(isNotEmptyString)(requiredMessage),
    requiredArray           : predicateValidator(isNotEmptyArray)(requiredItemsMessage),
    lengthEqual             : lengthValidator(stringLength)(equal)('равна'),
    lengthGreaterThan       : lengthValidator(stringLength)(gt)('больше'),
    lengthGreaterOrEqualTo  : lengthValidator(stringLength)(gte)('больше или равна'),
    lengthLessThan          : lengthValidator(stringLength)(lt)('меньше'),
    lengthLessOrEqualTo     : lengthValidator(stringLength)(lte)('меньше или равна'),
    emailValid              : predicateValidator(RegExp.prototype.test.bind(isEmail))(emailMessage),
    passwordStrongEnough    : predicateValidator(RegExp.prototype.test.bind(isPasswordStrongEnough))(passwordStrongEnoughMessage),

    // Async
    userAsync               : callValidateApi('user')(ValidationActions.validateUser),

    //Applicative
    ap                      : ap
};

module.exports = Validators;