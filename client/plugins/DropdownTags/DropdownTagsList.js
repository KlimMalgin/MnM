/**
 * Created by bas on 27.10.2014.
 */
'use strict';

var Option = require('fantasy-options').Option;

var curry = require('core.lambda').curry;

var ListItem = require('./DropdownTagsListItem');

var React = require('react'),
    cs = React.addons.classSet,
    pt = React.PropTypes;

var _clickListItem = curry(2, function (context, itemName) {
    return function () {
        context.props.actions.addTags(itemName);
    };
});

var DropdownTagsListCreator = function (config) {
    var DisplayField = config.DisplayProperty || "name";

    return React.createClass({

        propTypes : {
            list        : pt.object,
            focused     : pt.object
        },

        getDefaultProps : function() {
            return {
                list        : Option.from([]),
                focused     : Option.from(-1),
                phrase      : Option.from("")
            };
        },

        v: {
            list: [],
            focused: -1,
            phrase: "",
            fieldFocus: false
        },

        componentWillReceiveProps: function (nextProps) {
            this.v.list         = nextProps.list.getOrElse([]);
            this.v.focused      = nextProps.focused.getOrElse(-1);
            this.v.phrase       = nextProps.phrase.getOrElse("");
            this.v.fieldFocus   = nextProps.fieldFocus;
        },

        renderListItems: function (itemRenderer) {
            return this.v.list.map(itemRenderer);
        },

        renderItem: function (item, index) {
            var cls         = {},
                highlight   = this.v.focused === -1 ? this.v.phrase : "",
                text        = this.v.focused === -1 ? item[DisplayField].substr(this.v.phrase.length) : item[DisplayField];

            cls['list-item']    = true;
            cls['focused']      = index === this.v.focused;

            return <ListItem onClick={_clickListItem(this)(item[DisplayField])} className={cs(cls)} highlight={highlight} text={text} />;
        },

        renderList: function (cls) {
            return (<ul className={cs(cls)}>
            {this.renderListItems(this.renderItem)}
            </ul>);
        },

        renderHint: function (cls) {
            return <div className={cs(cls)}>По данному запросу отсутствуют результаты</div>;
        },

        render: function () {
            var list_classes = {},
                empty = !this.v.list.length || !this.v.fieldFocus;

            list_classes["dropdown-tags-list"] = true;
            list_classes["empty"] = empty;

            return this.renderList(list_classes);
        }
    });
};


module.exports = DropdownTagsListCreator;