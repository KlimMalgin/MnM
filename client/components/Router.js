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

var Dashboard = require('./Dashboard/Dashboard'),
    // == Pages
    Pages = require('../pages/Pages'),
    LoginPage = require('../pages/LoginPage'),
    Application = require('./../pages/ApplicationPage');

var Router = React.createClass({

    render: function () {
        return (
            <Routes location="history" preserveScrollPosition>
                <Route handler={Pages}>
                    <Route name="login" handler={LoginPage} path="/login" />

                    <Route name="application" handler={Application}>
                        <Route name="dashboard" handler={Dashboard} path="/dashboard" />
                        <DefaultRoute handler={Dashboard} />
                    </Route>
                    <DefaultRoute handler={LoginPage} />
                </Route>
            </Routes>
        );
    }
});

module.exports = Router;