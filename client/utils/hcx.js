/**
 * Created by laiff on 13.10.14.
 */

'use strict';

var cx = require('react/lib/cx'),
    hyp = require('react/lib/hyphenateStyleName');

var l = require('core.lambda'),
    compose = l.compose;

/**
 * ClassSet + Hyphenate.
 *
 * @param {Object} - условия для стилей
 *
 * @summary {longClassName: true, someOtherClass: false} => "long-class-name"
 * @type {Function}
 */
var hcx = compose(hyp, cx);

module.exports = hcx;