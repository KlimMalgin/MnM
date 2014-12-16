/** @jsx React.DOM*/
/**
 * Created by klim on 15.12.14.
 */

var React = require('react/addons'),
    cs = React.addons.classSet;

var Pages = React.createClass({

    render: function () {
        var classes = {
            pages : true
        };

        return (
            <div className={cs(classes)}>
                {this.props.activeRouteHandler()}
            </div>
        );
    }

});

module.exports = Pages;