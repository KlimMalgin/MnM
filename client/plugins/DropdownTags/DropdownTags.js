/** @jsx React.DOM*/
/**
 * Created by bas on 27.10.2014.
 */
'use strict';

var Option = require('fantasy-options').Option;

var React = require('react'),
    merge = require('react/lib/merge');

var DocumentListenerMixin = require('../../mixins/DropdownTags/DocumentListenerMixin');

var DropdownTagsField = require('./DropdownTagsField');
var DropdownTagsList = require('./DropdownTagsList');

var Reflux = require('reflux'),
    ListenerMixin = Reflux.ListenerMixin;

var DropdownActions = require('../../actions/DropdownActions'),
    ValidationActions = require('../../actions/ValidationActions');

var PhraseStore = require('../../stores/DropdownTags/PhraseStore');
var FocusedStore = require('../../stores/DropdownTags/FocusedStore');
var FieldFocusStore = require('../../stores/DropdownTags/FieldFocusStore');
var TagsStore = require('../../stores/DropdownTags/TagsStore');

var MessagePlugin = require('./plugin/Message');
var LabelPlugin = require('./plugin/Label');


var DropdownTagsCreator = function (dataStore) {
    return React.createClass({

        mixins: [
            ListenerMixin,
            Reflux.connect(FocusedStore, 'focused'),
            Reflux.connect(TagsStore, 'tags'),
            Reflux.listenTo(TagsStore, 'onTagsChanged'),
            Reflux.listenTo(FieldFocusStore, 'onFieldFocusChanged'),
            Reflux.connect(dataStore),
            Reflux.connect(PhraseStore),
            Reflux.connect(FieldFocusStore, 'fieldFocus'),
            DocumentListenerMixin
        ],

        getDefaultProps: function () {
            return {
                field: {
                    maxTags: 3,
                    placeholder: '',
                    message: {
                        text: '',
                        behavior: 'none', // none|focus|static
                        type: 'info'      // info|error
                    }
                },
                dataStore: null
            };
        },

        getInitialState: function () {
            return {
                items: [],
                message: {
                    visible: false
                }
            };
        },

        handleDocumentClick: function (e) {
            if (isDropdown(e.target, 1, 6)) {
                DropdownActions.enableFieldFocus();
            } else {
                DropdownActions.disableFieldFocus();
            }

            /**
             * Пройдет по DOM дереву вверх, проверяя классы у el
             */
            function isDropdown(el, iter, stop) {
                iter = iter || 1;
                return el.classList && el.classList.contains("dropdown-tags") ? true :
                    iter < stop && !!el.parentNode ?
                        isDropdown(el.parentNode, ++iter, stop) : false;
            }
        },

        isDisabledDropdown: function () {
            return this.props.field.maxTags <= this.state.tags.length;
        },

        onTagsChanged: function (tags) {
            ValidationActions.validate(this.props.field, tags);
        },

        getFieldActions: function () {
            return {
                addTags: DropdownActions.addTags,
                removeLastTag: DropdownActions.removeLastTag,
                removeTag: DropdownActions.removeTag,
                nextFocused: DropdownActions.nextFocused,
                prevFocused: DropdownActions.prevFocused,
                clearFocused: DropdownActions.clearFocus,
                completePhrase: DropdownActions.completePhrase,
                disableFieldFocus: DropdownActions.disableFieldFocus
            };
        },

        getListActions: function () {
            return {
                addTags: function (itemName) {
                    DropdownActions.addTags(itemName);
                    DropdownActions.clearFocus();
                    DropdownActions.changePhrase(Option.from(""));
                }
            };
        },

        componentWillUpdate: function (nextProps, nextState) {
            if (nextProps.field.maxTags <= nextState.tags.length) {
                nextState.phrase.chain(function (v) {
                    v.length && DropdownActions.changePhrase(Option.from(""));
                });
            }
        },

        onFieldFocusChanged: function (fieldFocus) {
            this.setState({
                message: merge(this.props.field.message, {
                    visible: fieldFocus
                })
            });
        },

        handleFocusField: function () {
            if (!this.state.fieldFocus) {
                DropdownActions.enableFieldFocus();
            }
        },

        render: function () {
            var stateLinker = {
                    value: '',
                    requestChange: function (valueOption) {
                        DropdownActions.changePhrase(valueOption);
                    }
                },
                pluginState = {
                    arrow: !!this.state.items.getOrElse([]).length
                };

            return (
                <div className="dropdown-tags form-group">
                {MessagePlugin(this.state.message)}
                    <LabelPlugin>{this.props.field.label}</LabelPlugin>
                    <DropdownTagsField
                        className="form-control"
                        tags={this.state.tags}
                        hint={this.state.hint}
                        phrase={this.state.phrase}
                        focused={this.state.focused}
                        focusInput={this.state.message.visible}
                        fieldFocus={this.state.fieldFocus}
                        disable={this.isDisabledDropdown()}
                        valueLink={stateLinker}
                        actions={this.getFieldActions()}
                        plugins={pluginState}
                        placeholder={this.props.field.placeholder}
                        onFocus={this.handleFocusField}
                    />
                    <DropdownTagsList
                        list={this.state.items}
                        phrase={this.state.phrase}
                        focused={this.state.focused}
                        fieldFocus={this.state.fieldFocus}
                        actions={this.getListActions()}
                    />
                </div>
            );
        }
    });
};

module.exports = DropdownTagsCreator;