'use strict';

/**
 *
 * @param {object} object
 * @param {object} properties
 * @returns {object}
 */
function withoutProperties(object, properties) {
  var result = {};

  for (var property in object) {
    if (object.hasOwnProperty(property) && !(property in properties))
      result[property] = object[property];
  }

  return result;
}

module.exports = withoutProperties;
