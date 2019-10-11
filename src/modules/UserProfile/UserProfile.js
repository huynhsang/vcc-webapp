import React from 'react';
import { Link } from 'react-router-dom';
import CoreService from "../../global/CoreService";
import Result from "../../global/Result";

import UserProfileRouter from'./UserProfileRouter';

const {accountService} = CoreService;

const UserProfile = ({ getProfileById, subRoutes }) => {
    const [profile, setProfile] = React.useState({});

    React.useEffect(() => {
        const userId: number = parseInt(window.location.pathname.split('/')[2]);
        if (userId) {
            accountService.findOneById(userId).then((result: Result) => {
                if (result.success) {
                    setProfile(result.data);
                } 
            })
        } 
    }, []);

    return (
        <div className="container discy-container">  
            <div className="row">
                <section
                    className="profile-background-image box-shadow--blur"
                    style={{
                        backgroundImage:
                            'url(' +
                            require(`../../static/resources/img/bg-user.jpg`) +
                            ')',
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
                        </div>
                        <div className="shell-info">
                            <Link to="/" className="title-info">
                                About<i className="fas fa-arrow-right"></i>
                            </Link>
                            <Link to="/" className="title-info">
                                Education<i className="fas fa-arrow-right"></i>
                            </Link>
                            <Link to="/" className="title-info">
                                Experience<i className="fas fa-arrow-right"></i>
                            </Link>
                            <Link to="/" className="title-info">
                                Quetions<i className="fas fa-arrow-right"></i>
                            </Link>
                            <Link to="/" className="title-info">
                                Answer<i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </section>
                <div className="user-container col-lg-9 responsive-user">
                    <UserProfileRouter/>
                </div>
            </div>
        </div>
    );
};


export default UserProfile;