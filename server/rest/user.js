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


module.exports = user;