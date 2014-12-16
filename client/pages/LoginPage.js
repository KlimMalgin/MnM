/** @jsx React.DOM*/
/**
 * Created by klim on 14.12.14.
 */

var React = require('react');
var Option = require('fantasy-options').Option;



var LoginPage = React.createClass({

    render: function () {
        return (
            <div className="login-page">
                <div class="panel panel-default">
                    <div class="panel-body">
                    Панель для размещения формы входа
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = LoginPage;