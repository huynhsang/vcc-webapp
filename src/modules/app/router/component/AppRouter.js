import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { AuthLink, PublicLink, UnAuthLink } from './../config/URLMatching';
import UnAuthRouter from './../config/UnAuthRouter';
import AuthRouter from './../config/AuthRouter';
import RouteNotFound from './RouteNotFound';

const AppRouter = ({ auth }) => (
    <Switch>
        {UnAuthLink.map((route, index) => (
            <UnAuthRouter
                key={index}
                path={route.path}
                isAuthenticated={auth.isAuthenticated}
                component={route.component}
            />
        ))}
        {AuthLink.map((route, index) => (
            <AuthRouter
                key={index}
                path={route.path}
                exact={route.exact}
                isAuthenticated={auth.isAuthenticated}
                subRoutes={route.subRoutes}
                component={route.component}
            />
        ))}
        {PublicLink.reduce((acc, route) => {
            if (!route.subRoutes) {
                return [
                    ...acc,
                    <Route
                        key={`parent${acc.length}`}
                        path={route.path}
                        exact={route.exact}
                        render={props => (
                            <route.component
                                isAuthenticated={auth.isAuthenticated}
                                {...props}
                            />
                        )}
                    />,
                ];
            }

            const childRoutes = route.subRoutes.map((childRoute, index) => (
                <Route
                    key={`child${acc.length}`}
                    path={`${route.path}${childRoute.path}`}
                    exact={childRoute.exact}
                    render={props => (
                        <route.component
                            isAuthenticated={auth.isAuthenticated}
                            ChildComponent={childRoute.component}
                            {...props}
                        />
                    )}
                />
            ));
            return [...acc, ...childRoutes];
        }, []).map((routeComponent, index) => routeComponent)}
        <Route component={RouteNotFound} />
    </Switch>
);

AppRouter.propTypes = {
    auth: PropTypes.object.isRequired,
};

export default AppRouter;
