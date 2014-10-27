/**
 * Created by KlimMalgin on 27.10.2014.
 */
'use strict';


var keyMirror = require('react/lib/keyMirror');

module.exports = {

    FormState : keyMirror({
        EDITABLE: null,
        SUBMITTING: null,
        SUBMITTED: null
    })
};
