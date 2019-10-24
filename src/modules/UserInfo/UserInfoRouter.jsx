import React from 'react';
import { withRouter, Route } from 'react-router-dom';

import { GeneralInfos } from './GeneralInfos';
import { MyProfile } from './MyProfile';
import { QuestionsAsked } from './QuestionsAsked';

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
            <Route
                exact
                path={`${match.path}/question-asked`}
                render={props => <QuestionsAsked {...props} />}
            />
        </>
    );
};

export default withRouter(UserProfileRouter);
