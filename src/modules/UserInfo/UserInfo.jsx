import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserInfoRouter from './UserInfoRouter';

import {
    getUserProfileFn,
    getExperiencesFn,
    getEducationsFn
} from '../../actions/userInfos';
import CustomCover from './CustomCover';
import { DefaultWrapper } from '../../component/Wrappers';

import UserMenu from './UserMenu';

const ContentWrapper = styled(DefaultWrapper)`
    min-height: calc(100vh - 430px);
`;

const UserProfile = ({
    userInfos,
    getUserProfile,
    getExperiences,
    getEducations,
    location,
    history,
    currentUser
}) => {
    const { userProfile } = userInfos;

    const userId = window.location.pathname.split('/')[2];

    React.useEffect(() => {
        if (userId) {
            getUserProfile(userId);
            getExperiences(userId);
            getEducations(userId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    if (!userProfile || userProfile.id !== userId) {
        return <div />;
    }

    const isCurrentUser = currentUser && currentUser.id === userId;

    return (
        <>
            <CustomCover
                userProfile={userProfile}
                isCurrentUser={isCurrentUser}
            />
            <UserMenu location={location} history={history} userId={userId} />
            <ContentWrapper>
                <UserInfoRouter />
            </ContentWrapper>
        </>
    );
};

const mapStateToProps = ({ userInfos, App: { currentUser } }) => ({
    userInfos,
    currentUser
});

const mapDispatchToProps = dispatch => ({
    getUserProfile: userId => dispatch(getUserProfileFn(userId)),
    getExperiences: userId => dispatch(getExperiencesFn(userId)),
    getEducations: userId => dispatch(getEducationsFn(userId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(UserProfile));
