import React from 'react';
import { withRouter, Route } from 'react-router-dom';

import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Registration from './Registration';
import EmailVerification from './EmailVerification';

const UserRouter = ({ match }) => {
    return (
        <>
            <Route
                exact
                path={`${match.path}/login`}
                render={props => <Login {...props} />}
            />
            <Route
                exact
                path={`${match.path}/registration`}
                render={props => <Registration {...props} />}
            />
            <Route
                exact
                path={`${match.path}/forgot-password`}
                render={props => <ForgotPassword {...props} />}
            />
            <Route
                exact
                path={`${match.path}/confirm`}
                render={props => <EmailVerification {...props} />}
            />
        </>
    );
};

export default withRouter(UserRouter);
