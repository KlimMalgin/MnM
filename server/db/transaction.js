/**
 * Created by KlimMalgin on 09.11.2014.
 */
'use strict';

var db = require('./db');
var curry = require('core.lambda').curry;

var insert = curry(3, db.insert)('Transaction');

module.exports = {

    /**
     * Выполнит операцию insert для объекта Transaction
     * @param {Object} data данные записи
     * @param {Function} callback Метод обратного вызова. Получит параметры (error, response)
     */
    insert: insert
};