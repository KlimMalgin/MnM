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

    highlighter: function (text, target) {
        var arr = text.split(target);

        return arr.map(function (item, index, list) {
            var result = [];
            result.push(<span>{item}</span>);
            index < list.length-1 && result.push(<span className="highlight">{target}</span>);
            return result;
        });
    },

    render: function () {
        var item = <li>{this.highlighter(this.props.text, this.props.highlight)}</li>;

        return this.transferPropsTo(item);
    }

});

module.exports = DropdownTagsListItem;