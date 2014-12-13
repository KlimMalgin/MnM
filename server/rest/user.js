/**
 * Created by KlimMalgin on 23.11.2014.
 */
'use strict';

var express = require('express');
var user = express.Router();

var userDb = require('../db/user');

var responceFormats = require('../response-formats');

/**
 *
 */
user.post('/user/login', function (req, res) {
    userDb.getUser(req.body || {},
        function (err, response) {
            if (!!err) {
                res.send(JSON.stringify(responceFormats.error({
                    message: "User not found",
                    data: req.body
                })));
            } else {
                res.send(JSON.stringify(responceFormats.success(response)));
            }
        });
});

user.post('/user/logout', function (req, res) {
    // TODO: Заглушка. Позволяет при любых обстоятельствах закрыть сессию на клиенте. При этом состояние пользователя на сервере не проверяется
    res.send(JSON.stringify(responceFormats.success({
        logout: true
    })));
});


module.exports = user;