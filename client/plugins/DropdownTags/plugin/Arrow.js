/** @jsx React.DOM*/
/**
 * Created by bas on 11.11.2014.
 */
'use strict';

var Icon = require('react-font-awesome').Icon;

var React = require('react/addons'),
    cs = React.addons.classSet;

var Arrow = React.createClass({

    getDefaultProps: function () {
        return {
            active: false
        };
    },

    render: function () {
        var type = this.props.active ? "caret-up" : "caret-down",
            cls = {
                'dropdown-plugin'   : true,
                'arrow'             : true,
                'active'            : this.props.active
            };

        return (<div className={cs(cls)}><Icon type={type} /></div>);
    }
});

module.exports = Arrow;