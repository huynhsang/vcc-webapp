import React from 'react';
import { withRouter, Route } from 'react-router-dom';

import { GeneralInfos } from './GeneralInfos';

const UserProfileRouter = ({ match, profile, setProfile }) => {
    return (
        <>
            <Route
                exact
                path={`${match.path}/`}
                render={props => (
                    <GeneralInfos
                        {...props}
                        profile={profile}
                        setProfile={setProfile}
                    />
                )}
            />
            <Route
                exact
                path={`${match.path}/general`}
                render={props => (
                    <GeneralInfos
                        {...props}
                        profile={profile}
                        setProfile={setProfile}
                    />
                )}
            />
        </>
    );
};

export default withRouter(UserProfileRouter);
