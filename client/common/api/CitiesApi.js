/**
 * Created by bas on 16.10.2014.
 */

var createTransport = require('./createTransport');

var transportObjects = createTransport({
    method: "POST",
    uri: function (opts) {
        return "/lists/cities"
    }
});

module.exports = {
    loadCities: function(opts) {
        return transportObjects(opts)
    }
};