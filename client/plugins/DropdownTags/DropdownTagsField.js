/** @jsx React.DOM*/
/**
 * Created by bas on 27.10.2014.
 */
'use strict';

var Option = require('fantasy-options').Option;

var ArrowPlugin = require('./plugin/Arrow');
var AddValuePlugin = require('./plugin/AddValue');

var Reflux = require('reflux'),
    ListenerMixin = Reflux.ListenerMixin;

//var FieldFocusStore = require('../../stores/DropdownTags/FieldFocusStore');

var React = require('react/addons'),
    empty = require('react/lib/emptyFunction'),
    cs = React.addons.classSet,
    pt = React.PropTypes;

var LensedStateMixin = require('react-lensed-state');


var DropdownTagsFieldCreator = function(config) {
    var ElementUniqueClass = 'field-uid-' + config.uid;

    return React.createClass({

        mixins: [
            ListenerMixin,
            LensedStateMixin,
            Reflux.listenTo(config.FieldFocusStore, 'onFieldFocusChanged')
        ],

        propTypes : {
            placeholder : pt.string,
            tags        : pt.array,
            valueLink   : pt.object,
            phrase      : pt.object,
            hint        : pt.object,
            focused     : pt.object,
            focusInput  : pt.bool,
            actions     : pt.object,
            plugins     : pt.object
        },

        getDefaultProps : function() {
            return {
                placeholder : '',
                tags        : [],
                valueLink   : {
                    value: [],
                    requestChange: empty
                },
                phrase      : Option.from(""),
                hint        : Option.from(""),
                focused     : Option.from(-1),
                focusInput  : false,
                fieldFocus  : false,
                actions     : {
                    addTags: empty,
                    removeLastTag: empty,
                    removeTag: empty,
                    nextFocused: empty,
                    prevFocused: empty,
                    clearFocused: empty,
                    completePhrase: empty,
                    disableFieldFocus: empty
                },
                plugins: {},
                onFocus: empty,
                onBlur: empty
            };
        },

        getInitialState : function() {
            return {
                tags: this.props.tags,
                hint: "",
                value: "",
                disable: false,
                input_width: 1
            };
        },

        componentWillReceiveProps: function (nextProps) {
            var state_part = {},
                phrase = nextProps.phrase.getOrElse(""),
                hint = nextProps.hint.getOrElse(""),
                tags = nextProps.tags,
                customPhrase = phrase.length && nextProps.focused.getOrElse(-1) < 0,
                placeholder = nextProps.placeholder;

            state_part['value'] = phrase;
            state_part['hint'] = hint;
            state_part['tags'] = tags;
            state_part['custom_phrase'] = customPhrase;
            state_part['input_width'] = (phrase.length + hint.length) || placeholder.length || 1;

            this.clearDisabledField();
            this.setState(state_part);
        },

        onFieldFocusChanged: function (fieldFocus) {
            fieldFocus && document.getElementsByClassName(ElementUniqueClass)[0].focus();
        },

        handleClickTag: function (e) {
            this.props.actions.removeTag(e.target.innerText);
        },

        handleAddCustomValue: function () {
            this.props.actions.addTags(this.state.value, true);
            this.props.actions.clearFocused();
            this.props.valueLink.requestChange(Option.from(""));
        },

        handleKeyDown: function (e) {
            var tags = [],
                srcValue = e.target.value,
                value = srcValue;

            var phrase = this.props.phrase.getOrElse(""),
                hint = this.props.hint.getOrElse(""),
                focused = this.props.focused.getOrElse(-1);

            // Клавиша TAB
            if (e.keyCode === 9) {
                this.props.actions.disableFieldFocus();
            }

            // Клавиша ESC
            if (e.keyCode === 27) {
                this.props.valueLink.requestChange(Option.from(""));
            }

            // Клавиша Enter
            if (e.keyCode === 13 && srcValue.length > 0) {
                if (focused >= 0) {
                    this.props.actions.addTags(value);
                    this.props.actions.clearFocused();
                    this.props.valueLink.requestChange(Option.from(""));
                } else {
                    if (this.state.value.length && this.state.hint.length) {
                        this.props.actions.addTags(this.state.value + this.state.hint);
                        this.props.actions.clearFocused();
                        this.props.valueLink.requestChange(Option.from(""));
                    }
                }
            }

            // Клавиша Backspace
            if (e.keyCode === 8 && srcValue.length === 0) {
                tags = this.state.tags;
                if (tags.length) {
                    this.props.actions.removeLastTag();
                }
            }

            // Стрелка вверх
            if (e.keyCode === 38) {
                this.props.actions.prevFocused();
            }

            // Стрелка вправо
            if (e.keyCode === 39) {
                var newValue = phrase + hint;
                this.props.actions.completePhrase(Option.from(newValue));
            }

            // Стрелка вниз
            if (e.keyCode === 40) {
                this.props.actions.nextFocused();
            }

        },

        handleFocusInput: function () {
            this.props.onFocus();
        },

        renderTags: function () {
            var that = this;
            return this.state.tags.map(function (tag) {
                var tagCls = {
                    tag: true,
                    custom: tag.custom
                };
                return <span onClick={that.handleClickTag} className={cs(tagCls)}>{tag.name}</span>;
            });
        },

        requestChange: function (newValue) {
            if (this.props.disable) newValue = "";
            this.props.valueLink.requestChange(Option.from(newValue));
        },

        clearDisabledField: function () {
            if (this.props.disable && this.state.value) {
                this.props.valueLink.requestChange(Option.from(""));
            }
        },

        render: function () {
            var empty = this.state.tags.length === 0 ? true : false;
            var tagsAreaCls = {
                'tags-area' : true,
                'empty'     : empty
            };

            var dropdownFieldCls = {
                'dropdown-tags-field': true,
                'focused': this.props.focusInput
            };

            var inputFieldCls = {
                'dropdown-tags-input'   : true,
                'visible'               : !this.props.disable
            };
            inputFieldCls[ElementUniqueClass] = true;


            var fieldValueLink = {
                value: this.state.value,
                requestChange: this.requestChange
            };

            var field = (
                <div className={cs(dropdownFieldCls)}>
                    <div className={cs(tagsAreaCls)}>
                    {this.renderTags()}
                        <span className="field-wrapper">
                            <span className="hint-wrapper">
                                <span className="auto-complete-phrase">{this.state.value}</span>
                                <span className="auto-complete-hint">{this.state.hint}</span>
                            </span>
                            <input
                                type="text"
                                className={cs(inputFieldCls)}
                                onKeyDown={this.handleKeyDown}
                                valueLink={fieldValueLink}
                                size={this.state.input_width}
                                placeholder={this.props.placeholder}
                                autocomplete="off"
                                onFocus={this.handleFocusInput}
                            />
                        </span>
                    </div>
                    <AddValuePlugin onClick={this.handleAddCustomValue} visible={this.state.custom_phrase} />
                    <ArrowPlugin active={this.props.plugins.arrow} />
                </div>
            );

            return this.transferPropsTo(field);
        }
    });

};

//var DropdownTags = ;

module.exports = DropdownTagsFieldCreator;