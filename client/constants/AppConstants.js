/**
 * Created by KlimMalgin on 27.10.2014.
 */
'use strict';


var keyMirror = require('react/lib/keyMirror');

module.exports = {

    ApiHost: "http://localhost:7878/api",

    FormState : keyMirror({
        EDITABLE: null,
        SUBMITTING: null,
        SUBMITTED: null
    }),

    /**
     * Состояние валидации
     */
    ValidationStatus : keyMirror({
        INITIAL: null,
        VALIDATING: null,
        VALID: null,
        INVALID: null
    }),

    lStorage : {
        USER: 'mnm-user'
    },

    rest: {
        user: {
            login: {
                url: "/user/login",
                type: "POST"
            },
            logout: {
                url: "/user/logout",
                type: "POST"
            }
        },
        transaction: {
            url: "/transaction",
            type: "POST",

            filter: {
                url: "/transaction/filter",
                type: "POST"
            }
        }
    }
};
