import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Page404 from './Page404';

import { UserProfile } from '../UserProfile';
import { AddQuestion } from '../AddQuestion';

import { Home } from '../Home';

import { AboutUs } from '../AboutUs';

import { Authentification, EmailVerification } from '../Authentification';

import { ViewQuestion } from '../ViewQuestion';

const AppRouter = ({ auth }) => {
    const { isAuthenticated, toAuthenticate } = auth;

    return (
        <Switch>
            <Route path="/home" render={props => <Home {...props} />} />

            <Route
                exact
                path="/about-us/"
                render={props => <AboutUs {...props} />}
            />

            {/**TO DO: can change to /users to list all users profile, 
            and /users/:id for invidual */}
            <Route
                exact
                path="/user-profile/:id"
                render={props => <UserProfile {...props} />}
            />
            <Route
                exact
                path="/add-question"
                render={props => <AddQuestion {...props} />}
            />
            <Route
                exact
                path="/confirm"
                render={props => <EmailVerification {...props} />}
            />
            <Redirect exact from="/" to="/home/questions" />
            <Route component={Page404} />
        </Switch>
    );
};

export default AppRouter;
