/**
 * Created by KlimMalgin on 23.11.2014.
 */
'use strict';

var Reflux = require('reflux');
var Option = require('fantasy-options').Option;
var userConst = require('../constants/AppConstants').lStorage;
var store = require('store');

var checkUserLoginedDef = {
    preEmit: function () {
        return Option.from(store.get(userConst.USER));
    }
};

var UserActions = {
    /**
     * Проверит зарегитрирован ли пользователь в системе
     * Если да - передаст Option с объектом пользователя
     * Если нет - передаст Option.None
     */
    checkUserLogined: Reflux.createAction(checkUserLoginedDef)

};

module.exports = UserActions;
