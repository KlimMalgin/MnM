/**
 * Created by KlimMalgin on 25.10.2014.
 */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var formApi = require('./form');

var app = express();

app.use(express.static('./build'));

var sendFile = function(req, res){
    res.sendFile('/index.html', { root : path.join(__dirname, path.join('..', 'build'))});
};

app.use(bodyParser.json());

app.use('/api/', formApi);

app.get(/(.*)/, sendFile);

app.listen(7878);
