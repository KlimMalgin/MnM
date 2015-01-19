/**
 * Created by bas on 17.11.2014.
 */
'use strict';

var EventListener = require('../../../node_modules/react-bootstrap/utils/EventListener');

var DocumentListenerMixin = {

    componentDidMount: function () {
        this._onDocumentClickListener =
            EventListener.listen(document, 'click', this.handleDocumentClick ||
            function () {
                console.info("handleDocumentClick не реализован. %o", arguments);
            });
    },

    componentWillUnmount: function () {
        if (this._onDocumentClickListener) {
            this._onDocumentClickListener.remove();
        }
    }

};

module.exports = DocumentListenerMixin;