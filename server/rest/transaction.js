/**
 * Created by KlimMalgin on 07.11.2014.
 */
'use strict';

var express = require('express');
var transaction = express.Router();

var transactionDb = require('../db/transaction');


/**
 * Вернуть все транзакции пользователя
 */
transaction.get('/transaction', function (req, res) {

    transactionDb.insert({
        tags: {
            categories: [],
            accounts: []
        },
        cost: 1024,
        description: "",
        date: new Date()
    }, function (err, resp) {
        console.log("PARSE RESPONSE: ", err, resp);
        res.send("GET: /transaction");
    });

});

/**
 * Вернуть транзакцию пользователя по id
 */
transaction.get('/transaction/:id', function (req, res) {
    res.send("GET: /transaction/:id");
});

/**
 * Добавление транзакции в хранилище
 *
 {
   tags: {
     categories: [],
     accounts: []
   },
   cost: 1024,
   description: "",
   date: new Date()
 }
 *
 */
transaction.post('/transaction', function (req, res) {



    res.send("POST: /transaction/");
});

module.exports = transaction;