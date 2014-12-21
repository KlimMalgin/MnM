/**
 * Created by KlimMalgin on 21.12.2014.
 */
'use strict';


var express = require('express');
var tags = express.Router();

var tagsDb = require('../db/tags');

var responceFormats = require('../response-formats');

/**
 * Вернуть все теги пользователя,
 * подходящие под параметры фильтра
 */
tags.post('/tags', function (req, res) {
    tagsDb.select(req.body || {},
        function (err, response) {
            res.send(JSON.stringify(responceFormats.success(response)));
        });
});


module.exports = tags;