import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Link, withRouter } from 'react-router-dom';
import CoreService from '../../global/CoreService';
import Result from '../../global/Result';

import UserInfoRouter from './UserInfoRouter';
import CookieConstant from '../../common/constant/CookieConstant';
import CookieHelper from '../../common/util/CookieHelper';

const { getCookie } = CookieHelper;
const { userIdKey } = CookieConstant;

const BgPhoto = require(`../../static/resources/img/bg-user.jpg`);

const { accountService } = CoreService;

const Wrapper = styled.section`
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 2px;
`;

const UserProfile = ({ subRoutes, location, history }) => {
    const { t } = useTranslation();

    const [profile, setProfile] = React.useState({});

    const userId = window.location.pathname.split('/')[2];
    const isMainUserProfile = getCookie(userIdKey) === userId;

    React.useEffect(() => {
        if (userId) {
            accountService.findOneById(userId).then((result: Result) => {
                if (result.success) {
                    setProfile(result.data);
                }
            });
        }
    }, [userId]);

    const { firstName, lastName } = profile;

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
                ></section>
                <Wrapper className="user-container info-user position-relative col-lg-3">
                    <div className="avatar-user">
                        <img
                            src={profile.avatar}
                            width="200"
                            alt=""
                            className="img-responsive"
                        />
                    </div>
                    <div className="title-user-info">
                        <div className="text-center">
                            {`${lastName} ${firstName}`}
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
                        </div>
                    </div>
                </Wrapper>
                <div className="user-container col-lg-9 responsive-user">
                    <UserInfoRouter profile={profile} />
                </div>
            </div>
        </div>
    );
};

export default withRouter(UserProfile);
