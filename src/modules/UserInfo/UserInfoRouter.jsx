import React from 'react';
import { withRouter, Route } from 'react-router-dom';

import { GeneralInfos } from './GeneralInfos';
import { MyProfile } from './MyProfile';

const UserProfileRouter = ({ match, profile }) => {
    return (
        <>
            <Route
                exact
                path={`${match.path}/`}
                render={props => <GeneralInfos {...props} profile={profile} />}
            />
            <Route
                exact
                path={`${match.path}/general`}
                render={props => <GeneralInfos {...props} profile={profile} />}
            />
            <Route
                exact
                path={`${match.path}/my-profile`}
                render={props => <MyProfile {...props} />}
            />
        </>
    );
};

export default withRouter(UserProfileRouter);
