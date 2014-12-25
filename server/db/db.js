/**
 * Created by KlimMalgin on 09.11.2014.
 */
'use strict';

/**
 * Модуль предоставляет общие методы работы
 * с БД, типа insert, select, update и др.
 */

var Parse = require('node-parse-api').Parse;
var CFG = require('../config');
var curry = require('core.lambda').curry;

var db = new Parse(CFG.PARSE.APP_ID, CFG.PARSE.MASTER_KEY);



var insert = curry(3, function (objectType, data, callback) {
    db.insert(objectType, data, callback);
});

var select = curry(3, function (objectType, params, callback) {
    db.findMany(objectType, params, callback);
});

var getUser = curry(2, function (params, callback) {
    db.getUser(params.username, params.password, callback);
});

var cloudRun = curry(3, function (functionName, params, callback) {
    db.cloudRun(functionName, params, callback);
});

module.exports = {
    /**
     * Добавить запись в БД.
     * @param {String} name имя(тип) записи
     * @param {Object} data данные записи
     * @param {Function} callback Метод обратного вызова. Получит параметры (error, response)
     * ===========================================================
     * db.insert('Foo', { foo: 'bar' }, function (err, response) {
     *     console.log(response);
     * });
     */
    insert: insert,

    /**
     * Получить записи из БД по указанным параметрам.
     * @param {String} name имя(тип) записи
     * @param {Object} params фильтрующие параметры
     * @param {Function} callback Метод обратного вызова. Получит записи,
     * соответствующие указанным параметрам (error, response)
     * ===========================================================
     * app.findMany('Foo', { foo: 'bar' }, function (err, response) {
     *      console.log(response);
     * });
     */
    select: select,

    /**
     * Запрос сессии пользователя
     */
    getUser: getUser,

    /**
     * Запустит выполнение метода в облаке Parse
     * @param {String} functionName имя функции
     * @param {Object} params параметры
     * @param {Function} callback Метод обратного вызова. Получит результат выполнения указанной функции,
     * соответствующий указанным параметрам (error, response)
     */
    cloudRun: cloudRun

};