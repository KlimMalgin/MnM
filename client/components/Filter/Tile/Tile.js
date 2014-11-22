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

    getDefaultProps: function () {
        return {
            dataItem: {}
        };
    },

    getInitialState: function () {
        return {
            cost: 0,
            date: "",
            description: "",
            objectId: "",
            tags: []
        };
    },

    /*componentWillReceiveProps: function(nextProps) {
        debugger;
        this.setState({
            cost: nextProps.dataItem.cost,
            date: nextProps.dataItem.date,
            description: nextProps.dataItem.description,
            objectId: nextProps.dataItem.objectId,
            tags: nextProps.dataItem.tags
        });
    },*/

    render: function () {
        return (
            <div className="transaction-tile">
                <Cost>{this.props.dataItem.cost}</Cost>
                <Date>{this.props.dataItem.date}</Date>
                <Description>{this.props.dataItem.description}</Description>
                <Tags>{this.props.dataItem.tags}</Tags>
            </div>
        );
    }

});

module.exports = Tile;