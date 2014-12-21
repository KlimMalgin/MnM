/**
 * Created by bas on 16.10.2014.
 */

var createTransport = require('./createTransport');

var loadTagsTransport = createTransport({
    method: "POST",
    uri: function () {
        return "/tags"
    }
});

module.exports = {
    loadTags: function(opts) {
        return loadTagsTransport(opts)
    }
};