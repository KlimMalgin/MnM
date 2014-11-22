/** @jsx React.DOM*/
/**
 * Created by KlimMalgin on 22.11.2014.
 */
'use strict';

var React = require('react');
var Tags = require('./Tags');
var Cost = require('./Cost');
var Date = require('./Date');
var Description = require('./Description');

var Tile = React.createClass({

    render: function () {
        return (
            <div className="transaction-tile">
                <Cost></Cost>
                <Date></Date>
                <Description></Description>
                <Tags></Tags>
            </div>
        );
    }

});

module.exports = Tile;