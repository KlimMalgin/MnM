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
                username: username,
                password: password
            }
        }).done(UserActions.loginUserSuccess, UserActions.loginUserError);
    }
};

var logoutUserDef = {
    preEmit: function (user) {
        UserApi.logoutUser({
            body: user
        }).done(UserActions.logoutUserSuccess, UserActions.logoutUserError);
    }
};

var loginUserSuccessDef = {
    preEmit: function (data) {
        if (data && data.objectId) {
            store.set(userConst.USER, data);
            return Option.from(data);
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

var logoutUserSuccessDef = {
    preEmit: function (data) {
        debugger;
        store.remove(userConst.USER);
        UserActions.checkUserLogined();
    }
};

var logoutUserErrorDef = {
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
     * Запрос на остановку пользовательской сессии
     */
    logoutUser: Reflux.createAction(logoutUserDef),

    /**
     * Ответы на запрос аутентификации
     */
    loginUserSuccess: Reflux.createAction(loginUserSuccessDef),
    loginUserError: Reflux.createAction(loginUserErrorDef),

    /**
     * Описание результата остановки пользовательской сессии
     */
    logoutUserSuccess: Reflux.createAction(logoutUserSuccessDef),
    logoutUserError: Reflux.createAction(logoutUserErrorDef)

};

module.exports = UserActions;
