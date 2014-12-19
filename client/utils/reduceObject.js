/**
 * Created by laiff on 30.10.14.
 */

module.exports = function(object, reducer) {
    var acc = [];
    for (var property in object) {
        if (object.hasOwnProperty(property))
            acc = acc.concat([reducer(object[property])]);
    }
    return acc.length === 0 ? null : acc;
};