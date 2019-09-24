import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Page404 from './Page404';

import { UserRouter } from '../User';
import { UserProfile } from '../UserProfile';
import { AddQuestion } from '../AddQuestion';

import { Questions } from '../Questions';
import { SubCategory } from '../SubCategory';
import { Badges } from '../Badges';

import { ViewQuestion } from '../ViewQuestion';

//TODO: add router need login
const AppRouter = () => {
    return (
        <Switch>
            <Route
                path="/questions"
                render={props => <Questions {...props} />}
            />
            <Route path="/tags" render={props => <SubCategory {...props} />} />
            <Route path="/badges" render={props => <Badges {...props} />} />
            <Route path="/user" render={props => <UserRouter {...props} />} />

            <Route
                exact
                path={`/question/:slug/view`}
                component={ViewQuestion}
            />

            {/**TO DO: can change to /users to list all users profile, and /users/:id for invidual */}
            <Route
                path="/user-profile/:id"
                render={props => <UserProfile {...props} />}
            />
            <Route
                path="/add-question"
                render={props => <AddQuestion {...props} />}
            />
            <Redirect exact from="/" to="/questions" />
            <Route component={Page404} />
        </Switch>
    );
};

export default AppRouter;
