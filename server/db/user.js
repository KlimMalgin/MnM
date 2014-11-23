/**
 * Created by KlimMalgin on 23.11.2014.
 */
'use strict';

var db = require('./db');

module.exports = {
    /**
     * Выполнит select для User
     * @param {Object} params параметры фильтрации выборки
     * @param {Function} callback Получит выбранных пользователей
     */
    getUser: db.getUser
};