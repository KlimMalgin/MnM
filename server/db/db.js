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

var db = new Parse(CFG.PARSE.APP_ID, CFG.PARSE.MASTER_KEY);

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
    insert: db.insert
};