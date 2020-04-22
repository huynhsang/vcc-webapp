import React from 'react';
import { withRouter, Route } from 'react-router-dom';

import { GeneralInfos } from './GeneralInfos';
import { MyProfile } from './MyProfile';
import { QuestionsAsked } from './QuestionsAsked';
import { AnsweredQuestions } from './AnsweredQuestions';

const UserProfileRouter = ({ match }) => {
    return (
        <>
            <Route
                exact
                path={`${match.path}/`}
                component={GeneralInfos}
            />
            <Route
                exact
                path={`${match.path}/general`}
                component={GeneralInfos}
            />
            <Route
                exact
                path={`${match.path}/my-profile`}
                component={MyProfile}
            />
            <Route
                exact
                path={`${match.path}/question-asked`}
                component={QuestionsAsked}
            />
            <Route
                exact
                path={`${match.path}/answers-related`}
                component={AnsweredQuestions}
            />
        </>
    );
};

export default withRouter(UserProfileRouter);
