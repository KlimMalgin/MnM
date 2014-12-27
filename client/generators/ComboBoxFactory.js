/**
 * Created by KlimMalgin on 21.12.2014.
 */
'use strict';

var ComboBoxCreator = require('../plugins/DropdownTags/DropdownTags');
var ComboBoxListCreator = require('../plugins/DropdownTags/DropdownTagsList');
var TagsListStore = require('../stores/TagsListStore');

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
             * Хранилище текущего списка элементов ComboBox'a
             */
            DataStore: TagsListStore,
            /**
             * Наименование поля элемента списка, которое используется как имя тега
             */
            DisplayProperty: 'text',

            ItemsList: ComboBoxListCreator
        })

    };

    return types[ComboBoxType];
};

module.exports = ComboBoxFactory;