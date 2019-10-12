import React from 'react';
import { withRouter, Route } from 'react-router-dom';

import UserAbout from './UserAbout';

const UserProfileRouter = ({ match }) => {
    return (
        <>
            <Route
                exact
                path={`${match.path}/`}
                render={props => <UserAbout {...props} />}
            />
            <Route
                exact
                path={`${match.path}/about`}
                render={props => <UserAbout {...props} />}
            />
        </>
    );
};

export default withRouter(UserProfileRouter);
