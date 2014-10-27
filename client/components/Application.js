/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 25.10.2014.
 */
'use strict';

var React = require('react/addons'),
    cs = React.addons.classSet;

var Application = React.createClass({

    render: function () {
        var classes = {
            application : true
        };

        return (
            <div className={cs(classes)}>
                <div className="area">
                    {this.props.activeRouteHandler()}
                </div>
            </div>
        );
    }

});

module.exports = Application;