/**
 * Created by KlimMalgin on 21.12.2014.
 */
'use strict';

var ComboBoxCreator = require('../plugins/DropdownTags/DropdownTags');
var ComboBoxListCreator = require('../plugins/DropdownTags/DropdownTagsList');
var ComboBoxItemsStoreCreator = require('../stores/ComboBoxItemsStore');
var TagsActionsCreator = require('../actions/TagsActions');

/**
 *
 */
var ComboBoxFactory = function (ComboBoxType) {

    var types = {
        /**
         * @param config Объект конфигурации ComboBox'a
         */
        CategoriesComboBox: ComboBoxCreator({
            /**
             * Наименование поля элемента списка, которое используется как имя тега
             */
            DisplayProperty: 'text',
            /**
             * Включить/отключить полнотекстовый поиск при выборке элементов из базы
             */
            FullTextSearch: false,
            /**
             * Описание кастомных событий loadComboBoxItems и receiveComboBoxItems
             */
            Actions: TagsActionsCreator,
            /**
             * Конструктор хранилища текущего списка элементов ComboBox'a
             */
            DataStoreCreator: ComboBoxItemsStoreCreator,
            /**
             * Конструктор компонента выпадающего списка, который будет
             * использован при генерации текущего контрола
             */
            ItemsListCreator: ComboBoxListCreator,


            Item: {
                createByText: function(text) {
                    return {
                        text: text,
                        custom: true
                    };
                },
                findByText: function() {},
                renderer: function(tagItem, handlers, displayText, cls) {
                    return <span onClick={handlers.onClick} className={cls}>{displayText}</span>;
                }
            }
        })

    };

    return types[ComboBoxType];
};

module.exports = ComboBoxFactory;