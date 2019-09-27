import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Page404 from './Page404';

import { UserProfile } from '../UserProfile';
import { AddQuestion } from '../AddQuestion';

import { Home } from '../Home';

import { Authentification, EmailVerification } from '../Authentification';

import { ViewQuestion } from '../ViewQuestion';

const AppRouter = ({ auth }) => {
    const { isAuthenticated, toAuthenticate } = auth;

    const renderComponent = Component => props => {
        if (toAuthenticate && !isAuthenticated) {
            return <Authentification toAuthenticate={toAuthenticate} {...props} />;
        }

        return <Component {...props} />;
    };

    return (
        <Switch>
            <Route path="/home" render={renderComponent(Home)} />

            {/**TO DO: can change to /users to list all users profile, 
            and /users/:id for invidual */}
            <Route
                exact
                path="/user-profile/:id"
                render={renderComponent(UserProfile)}
            />
            <Route
                exact
                path="/add-question"
                render={renderComponent(AddQuestion)}
            />
            <Route
                exact
                path="/confirm"
                render={props => <EmailVerification {...props} />}
            />
            <Redirect exact from="/" to="/home/questions" />
            <Route render={renderComponent(Page404)} />
        </Switch>
    );
};

export default AppRouter;
