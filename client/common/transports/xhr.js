/**
 * Created by KlimMalgin on 11.11.2014.
 */
'use strict';

var xhr = require('xhr');
var deferred = require('deferred');
var merge = require('react/lib/merge');

var apiHost = require('../../constants/AppConstants').ApiHost;

/**
 * @param config
 * @returns {Function}
 */
var createXhrTransport = function (config) {
    return function (opts) {
        /**
         * @type {{promise: Promise, resolve: Function, reject: Function}} Deferred
         */
        var d = deferred();
        xhr({
            withCredentials: true,
            json: opts && opts.body ? opts.body : {},
            uri: apiHost + config.uri(opts),
            method: config.method,
            headers: merge({
                "Cache-Control": "no-cache"
            }, config.headers || {})
        }, function (err, resp, body) {
            if (err) {
                d.reject({error: err});
                return;
            }
            switch (body.status) {
                case 'success' :
                    d.resolve(body.data);
                    break;
                case 'error' :
                    d.reject(merge(body.data, {
                        bodyMessage : body.message
                    }));
                    break;
                default :
                    break;
            }
        });

        return d.promise;
    }
};

module.exports = createXhrTransport;

