/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 30.09.2014.
 */
'use strict';

var React = require('react/addons'),
    cs = React.addons.classSet,
    pt = React.PropTypes;

var Icon = require('react-font-awesome').Icon;

var MultiSelect = React.createClass({

    propTypes : {
        placeholder : pt.string,
        tags        : pt.array
    },

    getDefaultProps : function() {
        return {
            placeholder : '',
            tags        : []
        };
    },

    getInitialState : function() {
        return {
            tags: this.props.tags
        };
    },

    deleteTagByText: function (text) {
        var tags = this.state.tags,
            ln = tags.length;

        // TODO: При наличии двух одинаковых тегов, удалится только первый из них. Одинаковых тегов в списке быть не должно
        for (var i = 0; i < ln; i++) {
            if (tags[i] === text) {
                tags.splice(i, 1);
                break;
            }
        }

        return tags;
    },

    createFocusForInput: function () {
        document.getElementsByClassName('multi-select-input')[0].focus();
    },

    handleClickTag: function (e) {
        var tags = this.deleteTagByText(e.target.innerHTML);
        this.setState({
            tags: tags
        });
    },

    handleClearFilter: function () {
        this.setState({
            tags: []
        });
    },

    handleKeyDown: function (e) {
        var tags = [],
            srcValue = e.target.value,
            value = srcValue.split(',');

        if (e.keyCode === 13 && srcValue.length > 0) {
            tags = this.state.tags;
            tags.push.apply(tags, value);
            this.setState({
                tags: tags
            });
            e.target.value = "";
        }

        if (e.keyCode === 8 && srcValue.length === 0) {
            tags = this.state.tags;
            tags.pop();
            this.setState({
                tags: tags
            });
        }

    },

    renderTags: function () {
        return this.state.tags.map(function (tag) {
            return (<span className="tag">{tag}</span>);
        });
    },

    render: function () {
        var empty = this.state.tags.length === 0 ? true : false;
        var tagsAreaCls = {
            'tags-area' : true,
            'empty'     : empty
        };

        var clearFieldCls = {
            'clear-field'   : true,
            'visible'       : !empty
        };
        var multiselect = (<div className="multi-select" onClick={this.createFocusForInput}>
            <div className={cs(tagsAreaCls)} onClick={this.handleClickTag}>
                {this.renderTags()}
                <input type="text" className="multi-select-input" onKeyDown={this.handleKeyDown} placeholder={this.props.placeholder} />
            </div>
            <div className={cs(clearFieldCls)} onClick={this.handleClearFilter}>
                <Icon type="close" />
            </div>
        </div>);

        return this.transferPropsTo(multiselect);
    }
});

module.exports = MultiSelect;
