/**
 * Created by KlimMalgin on 21.12.2014.
 */
'use strict';

var DropdownCreator = require('../plugins/DropdownTags/DropdownTags');
var TagsStore = require('../stores/TagsStore');

var DropdownDataStore = require('../stores/DropdownTags/DataStore');

var curry = require('core.lambda').curry;

/**
 * TODO: ++ Распилить CitiesStore на два. Первый должен содержать phrase и hint, второй - набор данных для списка
 * TODO: ++ Сейчас есть PhraseStore. Он не используется. Нужно чтобы он хранил phrase и hint
 *
 * TODO: Перевести компонент на TagsStore
 * TODO: Распилить события и transport-api
 */

/*var _dropdownCreator = function (store, fieldModel) {
    return function () {
        return Dropdown({
            dataStore: store,
            field: fieldModel
        });
    };
};*/

var ComboBoxGenerator = function (ComboBoxType) {

    var types = {
        /**
         * @param field модель-описание поля
         * @param dataStore хранилище с набором элементов для списка
         */
        CategoriesComboBox: DropdownCreator(TagsStore)/*,
        CustomComboBox: curry(2, _dropdownCreator(*//*Store*//*))*/
    };

    return types[ComboBoxType];
};

module.exports = ComboBoxGenerator;