/**
 * Created by KlimMalgin on 28.10.2014.
 */
'use strict';

var Validators = require('./Validators'),
    ap = Validators.ap;

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
        placeholder: 'Категории транзакции',
        message: {
            text: '',
            behavior: 'none',
            type: 'info'
        },
        validators: {
            sync: ap([
                Validators.requiredArray
            ])
        }
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
    },
    Email : {
        name: 'email',
        type: 'text',
        label: '',
        placeholder: 'email',
        message: {
            text: 'Ваш e-mail не будет отображаться и послужит только для связи с Вами',
            behavior: 'none',
            type: 'info'
        },
        validators: {
            sync : ap([
                Validators.required,
                Validators.emailValid
            ])
        }
    },
    Password : {
        name: 'password',
        type: 'password',
        label: '',
        placeholder: 'password',
        message: {
            text: 'Не доверяйте свой пароль третьим лицам!',
            behavior: 'none',
            type: 'info'
        },
        plugins: {
            togglePass: false
        },
        validators : {
            sync: ap([
                Validators.required
            ])
        }
    }
};

module.exports = FieldModels;