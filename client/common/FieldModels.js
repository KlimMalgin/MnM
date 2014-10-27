/**
 * Created by KlimMalgin on 28.10.2014.
 */
'use strict';



var FieldModels = {
    Cost : {
        name: 'cost',
        type: 'text',
        label: 'Сумма',
        placeholder: '0 000'
    },
    Tags : {
        name: 'tags',
        type: 'text',
        label: 'Категории',
        placeholder: 'Категории транзакции'
    },
    Description : {
        name: 'description',
        type: 'textarea',
        label: 'Описание',
        placeholder: 'Описание транзакции'
    },
    Date : {
        name: 'date',
        type: 'text',
        label: 'Дата',
        placeholder: 'Дата транзакции'
    }
};

module.exports = FieldModels;