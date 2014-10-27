/**
 * Created by KlimMalgin on 25.10.2014.
 */
'use strict';


var React = require('react'),
    Router = require('react-router'),
    Routes = Router.Routes,
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute;

var Application = require('./Application'),
    Dashboard = require('./Dashboard/Dashboard');

var Router = React.createClass({

    render: function () {
        return (
            <Routes location="history" preserveScrollPosition>
                <Route handler={Application}>
                    <DefaultRoute handler={Dashboard} />
                </Route>
            </Routes>
        );
    }
});

module.exports = Router;