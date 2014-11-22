/**
 * Created by KlimMalgin on 22.11.2014.
 */
'use strict';

var Reflux = require('reflux');


var receiveErrorDef = {
    sink: true,

    preEmit: function() {
        console.log("Error occurred: ", arguments.length === 1 ? arguments[0] : arguments);
    }
};
var ErrorActions = {
    receiveError : Reflux.createAction(receiveErrorDef)
};


module.exports = ErrorActions;