/**
 * Created by KlimMalgin on 23.11.2014.
 */
'use strict';

var Reflux = require('reflux');
var Option = require('fantasy-options').Option;
var userConst = require('../constants/AppConstants').lStorage;
var store = require('store');

var UserApi = require('../common/api/userApi');

var checkUserLoginedDef = {
    preEmit: function () {
        return Option.from(store.get(userConst.USER));
    }
};

var loginUserDef = {
    preEmit: function (username, password) {
        UserApi.loginUser({
            body: {
                username: username/*,
                password: password*/
            }
        }).done(UserActions.loginUserSuccess, UserActions.loginUserError);
    }
};

var loginUserSuccessDef = {
    preEmit: function (data) {
        debugger;
        if (data.results && data.results.length === 1) {
            store.set(userConst.USER, data.results[0]);
            return Option.from(data.results[0]);
        } else {
            return Option.None;
        }
    }
};

var loginUserErrorDef = {
    preEmit: function () {
        return Option.None;
    }
};

var UserActions = {
    /**
     * Проверит зарегитрирован ли пользователь в системе
     * Если да - передаст Option с объектом пользователя
     * Если нет - передаст Option.None
     */
    checkUserLogined: Reflux.createAction(checkUserLoginedDef),

    /**
     * Отправит данные для аутентификации пользователя на сервер
     */
    loginUser: Reflux.createAction(loginUserDef),

    /**
     * Ответы на запрос аутентификации
     */
    loginUserSuccess: Reflux.createAction(loginUserSuccessDef),
    loginUserError: Reflux.createAction(loginUserErrorDef)

};

module.exports = UserActions;
