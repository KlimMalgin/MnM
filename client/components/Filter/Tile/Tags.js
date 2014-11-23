/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 22.11.2014.
 */
'use strict';

var React = require('react');

var Tags = React.createClass({

    getDefaultProps: function () {
        return {
            children: []
        };
    },

    renderTagItem: function (item) {
        return <span className="tag-item">[{item.name}]</span>;
    },

    renderTags: function () {
        return this.props.children.map(this.renderTagItem);
    },

    render: function () {
        return (
            <div className="tags">{this.renderTags()}</div>
        );
    }

});

module.exports = Tags;