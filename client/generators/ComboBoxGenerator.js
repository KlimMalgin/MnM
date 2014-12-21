/**
 * Created by KlimMalgin on 21.12.2014.
 */
'use strict';

var Dropdown = require('../plugins/DropdownTags/DropdownTags');

var curry = require('core.lambda').curry;

/**
 * TODO: Подключить сторы со всеми вариантами наборов данных для генерируемых ComboBox'ов
 *
 */

var _dropdownCreator = function (store, fieldModel) {
    return function () {
        return Dropdown({
            dataStore: store,
            field: fieldModel
        });
    };
};

var ComboBoxGenerator = function (ComboBoxType) {

    var types = {
        /**
         * @param field модель-описание поля
         * @param dataStore хранилище с набором элементов для списка
         */
        CategoriesComboBox: curry(2, _dropdownCreator(/*Store*/)),
        CustomComboBox: curry(2, _dropdownCreator(/*Store*/))
    };

    return types[ComboBoxType];
};

module.exports = ComboBoxGenerator;