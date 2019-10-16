import React from 'react';
import { withRouter, Route } from 'react-router-dom';

import { GeneralInfos } from './GeneralInfos';

const UserProfileRouter = ({ match }) => {
    return (
        <>
            <Route
                exact
                path={`${match.path}/`}
                render={props => <GeneralInfos {...props} />}
            />
            <Route
                exact
                path={`${match.path}/general`}
                render={props => <GeneralInfos {...props} />}
            />
        </>
    );
};

export default withRouter(UserProfileRouter);
