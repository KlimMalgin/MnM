/** @jsx React.DOM*/
/**
 * Created by bas on 05.11.2014.
 */
'use strict';

var React = require('react');

var DropdownTagsListItem = React.createClass({

    componentDidUpdate: function () {
        if (this.props.className.indexOf('focused') >= 0) {
            var item = this.getDOMNode(),
                owner = this._owner.getDOMNode(),
            //--
                itemOffsetTop = item.offsetTop,
                height = owner.clientHeight-30,
                newOffset = 0;

            if ((itemOffsetTop - owner.scrollTop) > height) {
                owner.scrollTop = owner.scrollTop + height;
            }

            if (itemOffsetTop < owner.scrollTop) {
                newOffset = owner.scrollTop - height;
                owner.scrollTop = itemOffsetTop < newOffset ? itemOffsetTop - 30 : newOffset;
            }
        }
    },

    render: function () {
        var item = <li><span className="highlight">{this.props.highlight}</span><span>{this.props.text}</span></li>;

        return this.transferPropsTo(item);
    }

});

module.exports = DropdownTagsListItem;