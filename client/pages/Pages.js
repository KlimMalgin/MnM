/** @jsx React.DOM*/
/**
 * Created by klim on 15.12.14.
 */

var React = require('react');

var Pages = React.createClass({

    render: function () {
        return this.props.activeRouteHandler();
    }

});

module.exports = Pages;