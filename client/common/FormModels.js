/**
 * Created by KlimMalgin on 28.10.2014.
 */
'use strict';


var FieldModels = require('./FieldModels');

var FormModels = {
    TransactionForm : {
        cost: FieldModels.Cost,
        tags: FieldModels.Tags,
        description: FieldModels.Description,
        date: FieldModels.Date
    },
    Login: {
        email: FieldModels.Email,
        password: FieldModels.Password
    }
};

module.exports = FormModels;