/**
 * Created by laiff on 21.10.14.
 */
'use strict';

var Reflux = require('reflux');

//var ValidationApi = require('../common/api/ValidateApi');

/*var merge = require('react/lib/merge'),
    emptyObject = require('react/lib/emptyObject');*/

/*var receiveEmailValidDef = {
    preEmit : function(receivedData) {
        return merge(receivedData, {email: emptyObject})
    }
};*/

/*var validateEmailDef = {
    preEmit : function(validate) {
        ValidationApi.email(validate)
            .done(
            ValidationActions.receiveEmailValid,
            ValidationActions.receiveInvalid
        )
    }
};*/

var ValidationActions = {
    reset: Reflux.createAction(),
    clear: Reflux.createAction(),
    validate: Reflux.createAction(),
    validateAsync: Reflux.createAction(),

    //validateEmail: Reflux.createAction(validateEmailDef),

    validateUser: Reflux.createAction(),

    //receiveEmailValid: Reflux.createAction(receiveEmailValidDef),

    receiveValid: Reflux.createAction(),
    receiveInvalid: Reflux.createAction()
};

module.exports = ValidationActions;