/**
 * Created by KlimMalgin on 25.10.2014.
 */
'use strict';

/**
 * Пример REST для работы с некоторыми данными:
 * ---
 * GET      /data
 * POST     /data
 **/

var express = require('express');

var formats = require('./response-formats');

var form = express.Router();

form.get('/data', function(req, res) {
    console.log("\nGET: /data");

    res.send(formats.success({
        data: {
            value: 'some get data'
        }
    }));

});

form.post('/data', function(req, res) {
    console.log("\nPOST: /data");
    var body = req.body;

    res.send(formats.success({
        data: {
            value: 'some post data',
            request: {
                body: body
            }
        }
    }));

});

module.exports = form;