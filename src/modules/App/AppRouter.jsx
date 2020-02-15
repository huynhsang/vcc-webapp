import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Page404 from './Page404';

import { UserInfo } from '../UserInfo';
import { AddQuestion } from '../AddQuestion';

import { Home } from '../Home';

import { AboutUs } from '../AboutUs';
import { HomePage } from '../HomePage';
import { QuestionsPage } from '../QuestionsPage';

import {
    EmailVerification,
    ResetPassword,
    SSOLogin
} from '../Authentification';
import { Policy } from '../Policy';

const AppRouter = () => {
    return (
        <Switch>
            <Route path="/" exact render={props => <HomePage {...props} />} />
            <Route path="/home" exact render={props => <HomePage {...props} />} />
            <Route path="/questions" exact render={props => <QuestionsPage {...props} />} />
            <Route path="/homes" render={props => <Home {...props} />} />
            <Route
                exact
                path="/about-us/"
                render={props => <AboutUs {...props} />}
            />
            <Route
                path="/users/:id"
                render={props => <UserInfo {...props} />}
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
            <Route
                exact
                path="/reset-password"
                render={props => <ResetPassword {...props} />}
            />
            <Route
                exact
                path="/policy"
                render={props => <Policy {...props} />}
            />
            <Route
                exact
                path="/social-login"
                render={props => <SSOLogin {...props} />}
            />
            {/* <Redirect exact from="/" to="/home/questions" /> */}
            <Route component={Page404} />
        </Switch>
    );
};

export default AppRouter;
