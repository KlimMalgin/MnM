/**
 * Created by laiff on 06.10.14.
 */

var React = require('react'),
    ReactLink = require('react/lib/ReactLink');

var pt = React.PropTypes,
    lpt = ReactLink.PropTypes;

var Field = {};

var createFieldTypeChecker = function () {
    var shape = {
        type: pt.string.isRequired,
        label: pt.string.isRequired,
        placeholder: pt.string,
        message: pt.shape({
            text: pt.string,
            type: pt.oneOf(["info", "error"]),
            behavior: pt.oneOf(["static", "focus", "none"])
        }).isRequired,
        validators: pt.shape({
            sync: pt.arrayOf(pt.func),
            async: pt.arrayOf(pt.func)
        })
    };
    return pt.shape(shape);
};

Field.PropTypes = {
    field : createFieldTypeChecker
};

/**
 * Структура описания поля
 *
 * @typedef {{
 *      field: {
 *          type: string,
 *          label: string,
 *          placeholder: string,
 *          message: {
 *              text: string,
 *              type: string,
 *              behavior: string
 *          }
 *          validators: object
 *      }
 *  }} Field
 */

/**
 *
 * @type Field
 */
Field.DefaultModel = {
    field: {
        type: 'text',
        label: 'form field',
        placeholder: 'form field placeholder',
        message: {
            text: 'popup text on form field',
            type: 'info',
            behavior: 'focus'
        },
        validators: {}
    }
};

var fpt = Field.PropTypes;

/**
 *
 * @mixin FieldMixin
 *
 * @extends ReactCompositeComponentInterface
 *
 */
var FieldMixin = {

    propTypes: {
        field: fpt.field,
        valueLink: lpt.link
    },

    childContextTypes : {
        field: pt.any.isRequired
    },

    getChildContext : function () {
        return {
            field: this
        }
    },

    getDefaultProps: function () {
        return Field.DefaultModel;
    },

    model : function() {
        return this.props.field;
    }
};

module.exports = FieldMixin;