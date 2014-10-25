/**
 * Created by KlimMalgin on 25.10.2014.
 */
'use strict';


module.exports = {

    success: function (data) {
        return {
            status: 'success',
            data: data
        }
    },

    error: function (data) {
        return {
            status: 'error',
            data: data
        }
    }

};