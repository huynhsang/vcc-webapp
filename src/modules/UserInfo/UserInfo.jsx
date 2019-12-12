import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Link, withRouter } from 'react-router-dom';

import UserInfoRouter from './UserInfoRouter';

import { getIdAndToken } from '../../utils/cookie-tools';

import DefaultUserLogo from '../../images/default-user-logo.png';

import {
    getUserProfileFn,
    getExperiencesFn,
    getEducationsFn,
} from '../../actions/userInfos';

const BgPhoto = require(`../../static/resources/img/bg-user.jpg`);

const Wrapper = styled.section`
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 2px;
`;

const Badge = styled.span`
    background-color: #30a96f;
    font-size: 16px;
    padding: 0 5px;
    color: white;
`;

const UserProfile = ({
    subRoutes,
    location,
    history,
    userInfos,
    getUserProfile,
    getExperiences,
    getEducations,
}) => {
    const { t } = useTranslation();

    const { userProfile } = userInfos;

    const userId = window.location.pathname.split('/')[2];
    const { id } = getIdAndToken();
    const isMainUserProfile = id === userId;

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

    const { firstName, lastName, level, avatar } = userProfile;

    return (
        <div className="container discy-container">
            <div className="row">
                <section
                    className="profile-background-image"
                    style={{
                        backgroundImage: `url('${BgPhoto}')`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                />
                <Wrapper className="user-container info-user position-relative col-lg-3">
                    <div className="avatar-user">
                        <img
                            src={avatar || DefaultUserLogo}
                            width="200"
                            alt=""
                            className="img-responsive"
                        />
                    </div>
                    <div className="title-user-info">
                        <div className="text-center">
                            {`${lastName} ${firstName}`}
                        </div>
                        <div className="text-center">
                            <Badge>{level} test</Badge>
                        </div>
                        <div className="shell-info">
                            {isMainUserProfile && (
                                <Link
                                    to={`/users/${userId}/my-profile`}
                                    className="title-info"
                                >
                                    {t('common_my_profile')}
                                    <i className="fas fa-arrow-right" />
                                </Link>
                            )}
                            <Link
                                to={`/users/${userId}/general`}
                                className="title-info"
                            >
                                {t('common_general_infos')}
                                <i className="fas fa-arrow-right" />
                            </Link>
                            <Link
                                to={`/users/${userId}/question-asked`}
                                className="title-info"
                            >
                                {t('user_info_question_asked')}
                                <i className="fas fa-arrow-right" />
                            </Link>
                            <Link
                                to={`/users/${userId}/answers-related`}
                                className="title-info"
                            >
                                {t('user_info_amswers_related')}
                                <i className="fas fa-arrow-right" />
                            </Link>
                        </div>
                    </div>
                </Wrapper>
                <div className="user-container col-lg-9 responsive-user">
                    <UserInfoRouter />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ userInfos }) => ({ userInfos });

const mapDispatchToProps = dispatch => ({
    getUserProfile: userId => dispatch(getUserProfileFn(userId)),
    getExperiences: userId => dispatch(getExperiencesFn(userId)),
    getEducations: userId => dispatch(getEducationsFn(userId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(UserProfile));
