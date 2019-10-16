import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import CoreService from '../../global/CoreService';
import Result from '../../global/Result';

import UserInfoRouter from './UserInfoRouter';

const BgPhoto = require(`../../static/resources/img/bg-user.jpg`);

const { accountService } = CoreService;

const UserProfile = ({ getProfileById, subRoutes, location, history }) => {
    const [profile, setProfile] = React.useState({});

    const userId: number = parseInt(window.location.pathname.split('/')[2]);

    React.useEffect(() => {
        if (userId) {
            accountService.findOneById(userId).then((result: Result) => {
                if (result.success) {
                    setProfile(result.data);
                }
            });
        }
    }, []);

    const { firstName, lastName } = profile;

    return (
        <div className="container discy-container">
            <div className="row">
                <section
                    className="profile-background-image box-shadow--blur"
                    style={{
                        backgroundImage: `url('${BgPhoto}')`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                ></section>
                <section className="user-container info-user box-shadow--blur position-relative col-lg-3">
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
                        <div className="text-center">
                            <button
                                className="btn btn-info"
                                onClick={() => history.push('/my-profile')}
                            >
                                View Profile
                            </button>
                        </div>
                        {/* <div className="text-center">
                            <button className="btn btn-info">Follow</button>
                        </div>
                        <div className="row follow">
                            <div className="col-6">
                                <p className="font-size-18">Follower</p>
                                <p className="follow-number">540</p>
                            </div>
                            <div className="col-6">
                                <p className="font-size-20">Following</p>
                                <p className="follow-number">126</p>
                            </div>
                        </div> */}
                        <div className="shell-info">
                            <Link
                                to={`/users/${userId}/general`}
                                className="title-info"
                            >
                                General Infos
                                <i className="fas fa-arrow-right" />
                            </Link>
                        </div>
                    </div>
                </section>
                <div className="user-container col-lg-9 responsive-user">
                    <UserInfoRouter />
                </div>
            </div>
        </div>
    );
};

export default withRouter(UserProfile);
