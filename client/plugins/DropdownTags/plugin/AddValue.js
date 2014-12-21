/** @jsx React.DOM*/
/**
 * Created by bas on 13.11.2014.
 */
'use strict';

var Icon = require('react-font-awesome').Icon;

var React = require('react/addons'),
    empty = require('react/lib/emptyFunction'),
    cs = React.addons.classSet;

var AddValue = React.createClass({

    getDefaultProps: function () {
        return {
            visible: false,
            onClick: empty
        };
    },

    render: function () {
        var cls = {
                'dropdown-plugin'   : true,
                'add-value'         : true,
                'visible'           : this.props.visible
            };
        return (<div onClick={this.props.onClick} className={cs(cls)}><Icon type="angle-left" className="left-arrow" />&nbsp;добавить это значение как новое</div>);
    }
});

module.exports = AddValue;