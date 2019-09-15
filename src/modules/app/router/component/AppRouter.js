import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { AuthLink, PublicLink, UnAuthLink } from './../config/URLMatching';
import UnAuthRouter from './../config/UnAuthRouter';
import AuthRouter from './../config/AuthRouter';
import RouteNotFound from './RouteNotFound';

import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../../../configureStore';

export default class AppRouter extends Component {
    render() {
        let auth = this.props.auth;
        return (
            <ConnectedRouter history={history}>
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
                    {PublicLink.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            render={() => (
                                <route.component
                                    isAuthenticated={auth.isAuthenticated}
                                    subRoutes={route.subRoutes}
                                />
                            )}
                        />
                    ))}
                    <Route component={RouteNotFound} />
                </Switch>
            </ConnectedRouter>
        );
    }
}

AppRouter.propTypes = {
    auth: PropTypes.object.isRequired,
};
