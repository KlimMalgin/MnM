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
        }
    }
};
