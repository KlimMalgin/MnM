/** @jsx React.DOM*/
/**
 * Created by bas on 27.10.2014.
 */
'use strict';

var Option = require('fantasy-options').Option;

var React = require('react/addons'),
    merge = require('react/lib/merge');

var cs = React.addons.classSet;

var DocumentListenerMixin = require('../../mixins/DropdownTags/DocumentListenerMixin');
var FieldMixin = require('../../mixins/FieldMixin');
var ValidationMixin = require('../../mixins/ValidationMixin');

var DropdownTagsField = require('./DropdownTagsField');

var Reflux = require('reflux'),
    ListenerMixin = Reflux.ListenerMixin;

var DropdownActions = require('../../actions/DropdownActions');
var ValidationActions = require('../../actions/ValidationActions');

var ValidationStore = require('../../stores/ValidationStore');
var PhraseStoreCreator = require('../../stores/DropdownTags/PhraseStore');
var FocusedStoreCreator = require('../../stores/DropdownTags/FocusedStore');
var FieldFocusStoreCreator = require('../../stores/DropdownTags/FieldFocusStore');
var TagsStoreCreator = require('../../stores/DropdownTags/TagsStore');

var MessagePlugin = require('./plugin/Message');
var LabelPlugin = require('./plugin/Label');

var randomizer = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var DropdownTagsCreator = function (config) {

    return function() {
        var UID = [
            randomizer(1000, 9999).toString(),
            randomizer(1000, 9999).toString(),
            randomizer(1000, 9999).toString(),
            randomizer(1000, 9999).toString()
        ].join('-');

        console.info('UID: %o', UID);

        config.uid = UID;
        config.ComboBoxItemsActions = config.Actions(config);
        config.DropdownActions = DropdownActions(config);
        config.FieldFocusStore = FieldFocusStoreCreator(config);
        config.FocusedStore = FocusedStoreCreator(config);
        config.TagsStore = TagsStoreCreator(config);

        config.DataStore = config.DataStoreCreator(config);
        config.PhraseStore = PhraseStoreCreator(config);

        var ComboBoxField = DropdownTagsField(config);
        var ComboBoxList = config.ItemsListCreator(config);

        var FullTextSearch = config.FullTextSearch || false;



        return React.createClass({

            mixins: [
                ListenerMixin,
                FieldMixin,
                ValidationMixin,
                Reflux.connect(config.FocusedStore, 'focused'),
                Reflux.connect(config.TagsStore, 'tags'),
                Reflux.connect(ValidationStore, 'validation'),
                Reflux.listenTo(ValidationStore, 'onValidationChange'),
                Reflux.listenTo(config.TagsStore, 'onTagsChanged'),
                Reflux.listenTo(config.FieldFocusStore, 'onFieldFocusChanged'),
                Reflux.connect(config.DataStore),
                Reflux.connect(config.PhraseStore),
                Reflux.connect(config.FieldFocusStore, 'fieldFocus'),
                DocumentListenerMixin
            ],

            cmCfg: config,

            getInitialState: function () {
                return {
                    items: Option.from([]),
                    message: {
                        visible: false
                    }
                };
            },

            handleDocumentClick: function (firedUid, e) {
                if (isDropdown(e.target, 1, 6)) {
                    config.DropdownActions['enableFieldFocus' + config.uid]();
                } else {
                    config.DropdownActions['disableFieldFocus' + config.uid]();
                }

                /**
                 * Пройдет по DOM дереву вверх, проверяя классы у el
                 */
                function isDropdown(el, iter, stop) {
                    iter = iter || 1;
                    return el.classList && el.classList.contains("base-uid-" + firedUid) ? true :
                        iter < stop && !!el.parentNode ?
                            isDropdown(el.parentNode, ++iter, stop) : false;
                }
            },

            isDisabledDropdown: function () {
                return this.props.field.maxTags <= this.state.tags.length;
            },

            onTagsChanged: function (tags) {
                ValidationActions.validate(this.model(), tags);
            },

            onValidationChange: function() {
                this.setState({
                    message: merge(this.state.message, {
                        text: this.isInvalid() ? this.validation().messages : this.props.field.message.text,
                        type: this.isInvalid() ? 'error' : this.props.field.message.type,
                        behavior: this.isInvalid() ? 'static' : this.props.field.message.behavior
                    })
                });
            },

            getFieldActions: function () {
                return {
                    addTags: config.DropdownActions['addTags' + config.uid],
                    removeLastTag: config.DropdownActions['removeLastTag' + config.uid],
                    removeTag: config.DropdownActions['removeTag' + config.uid],
                    nextFocused: config.DropdownActions['nextFocused' + config.uid],
                    prevFocused: config.DropdownActions['prevFocused' + config.uid],
                    clearFocused: config.DropdownActions['clearFocus' + config.uid],
                    completePhrase: config.DropdownActions['completePhrase' + config.uid],
                    disableFieldFocus: config.DropdownActions['disableFieldFocus' + config.uid]
                };
            },

            getListActions: function () {
                return {
                    addTags: function (itemName) {
                        config.DropdownActions['addTags' + config.uid](config.Item.createByText(itemName), false);
                        config.DropdownActions['clearFocus' + config.uid]();
                        config.DropdownActions['changePhrase' + config.uid](Option.from(""));
                    }
                };
            },

            componentWillUpdate: function (nextProps, nextState) {
                if (nextProps.field.maxTags <= nextState.tags.length) {
                    nextState.phrase.chain(function (v) {
                        v.length && config.DropdownActions['changePhrase' + config.uid](Option.from(""));
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
                    config.DropdownActions['enableFieldFocus' + config.uid]();
                }
            },

            render: function () {
                var stateLinker = {
                        value: '',
                        requestChange: function (valueOption) {
                            config.DropdownActions['changePhrase' + config.uid](valueOption);
                        }
                    },
                    pluginState = {
                        arrow: !!this.state.items.getOrElse([]).length
                    },
                    cls = {};

                cls['dropdown-tags'] = true;
                cls['form-group'] = true;
                cls['base-uid-' + config.uid] = true;

                return (
                    <div className={cs(cls)}>
                        {MessagePlugin(this.state.message)}
                        <LabelPlugin>{this.props.field.label}</LabelPlugin>
                        <ComboBoxField
                            className="form-control"
                            tags={this.state.tags}
                            hint={FullTextSearch ? Option.of("") : this.state.hint}
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
                        <ComboBoxList
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

};

module.exports = DropdownTagsCreator;