import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import UserInfoRouter from './UserInfoRouter';
import DefaultUserLogo from '../../images/default-user-logo.png';

import {
    getUserProfileFn,
    getExperiencesFn,
    getEducationsFn
} from '../../actions/userInfos';
import { PageCover } from '../Header';
import { DefaultWrapper } from '../../component/Wrappers';

import { Badge } from '../Badges';
import UserMenu from './UserMenu';

const UserImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-top: 10px;
`;

const CenterWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const UserProfile = ({
    userInfos,
    getUserProfile,
    getExperiences,
    getEducations,
    location,
    history
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

    if (!userProfile) {
        return <div />;
    }

    const { firstName, lastName, avatar, points } = userProfile;

    return (
        <>
            <PageCover />
            <UserMenu location={location} history={history} userId={userId} />
            <CenterWrapper>
                <UserImage src={avatar || DefaultUserLogo} alt="" />
                <div>{`${lastName} ${firstName}`}</div>
                <Badge points={points} />
            </CenterWrapper>
            <DefaultWrapper>
                <UserInfoRouter />
            </DefaultWrapper>
        </>
    );
};

const mapStateToProps = ({ userInfos }) => ({ userInfos });

const mapDispatchToProps = dispatch => ({
    getUserProfile: userId => dispatch(getUserProfileFn(userId)),
    getExperiences: userId => dispatch(getExperiencesFn(userId)),
    getEducations: userId => dispatch(getEducationsFn(userId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(UserProfile));
