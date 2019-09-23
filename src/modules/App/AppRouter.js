import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Page404 from './Page404';

import { UserRouter } from '../User';
import { UserProfile } from '../UserProfile';
import { AddQuestion } from '../AddQuestion';
import {Home} from '../Home';

//TODO: add router need login
const AppRouter = ({ auth }) => {

    return (
        <Switch>
            <Route path="/home" render={props => <Home {...props} />} />
            <Route path="/user" render={props => <UserRouter {...props} />} />

            {/**TO DO: can change to /users to list all users profile, and /users/:id for invidual */}
            <Route
                path="/user-profile/:id"
                render={props => <UserProfile {...props} />}
            />
            <Route
                path="/question/add"
                render={props => <AddQuestion {...props} />}
            />
            <Redirect exact from="/" to="/home" />
            <Route component={Page404} />
        </Switch>
    );
};

AppRouter.propTypes = {
    auth: PropTypes.object.isRequired
};

export default AppRouter;
