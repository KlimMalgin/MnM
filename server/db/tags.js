/**
 * Created by KlimMalgin on 21.12.2014.
 */
'use strict';


var db = require('./db');

module.exports = {
    /**
     * Выполнит операцию insert для объекта Transaction
     * @param {Object} data данные записи
     * @param {Function} callback Метод обратного вызова. Получит параметры (error, response)
     */
    //insert: db.insert('Transaction'),

    /**
     * Запустит выполнение функции getTagsByPhrase в облаке
     * @param {Object} params параметры функции
     *  - userId objectId пользователя у которого берем теги
     *  - phrase фраза по которой фильтрова теги
     * @param {Function} callback Получит выбранные теги
     */
    select: db.cloudRun('getTagsByPhrase')
};