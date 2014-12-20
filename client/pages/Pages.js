/** @jsx React.DOM*/
/**
 * Created by klim on 15.12.14.
 */

var React = require('react');

var RouterHandler = require('../mixins/RouterHandler');

var Pages = React.createClass({

    mixins: [
        RouterHandler
    ],

    render: function () {
        return this.props.activeRouteHandler();
    }

});

module.exports = Pages;