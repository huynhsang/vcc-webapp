import React from 'react';
import BasicComponent from '../../../common/abstract/component/BasicComponent';
import avatar from '../../../static/resources/img/avatar-sang.jpg';
import logoCompany from '../../../static/resources/img/logo/est-rouge.png';
import logoFram from '../../../static/resources/img/logo/fram.png';

export default class UserProfile extends BasicComponent {

    render() {
        return (
            <div className="discy-container user-container">
                <section className="box-content--user header-user box-shadow--blur position-relative">
                    <div className="profile-background-image" style={{
                        backgroundImage: "url(" + require(`../../../static/resources/img/bg-user.svg`) + ")",
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}>
                    </div>
                    <div className="info-user position-relative pt10 pb4">
                        <div className="avatar-user">
                            <img src={avatar} width="150" alt="" className="img-responsive"/>
                        </div>
                        <div className="connect-user mr5">
                            <button className="btn btn-primary mr3">Connect</button>
                            <button className="btn btn-border">More...</button>
                        </div>
                        <div className="row ml3 mr3">
                            <div className="col-md-7 info-left">
                                <h4 className="m0">Sang Huynh</h4>
                                <p>Student at Trường Đại học Bách Khoa Đà Nẵng</p>
                                <p>
                                    <span>Vietnam</span> &nbsp; . &nbsp;
                                    <span>98 connections</span> &nbsp; . &nbsp;
                                    <span><a className="link-contact" href="javascript:void(0);">Contact info</a></span>
                                </p>
                            </div>
                            <div className="col-md-5 info-right">
                                <p>
                                    <img src={logoCompany} width="30" alt=""/> &nbsp;
                                    Est rouge, inc
                                </p>
                                <p>
                                    <img src={logoCompany} width="30" alt=""/> &nbsp;
                                    Da Nang University of Technology
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="box-content--user p5 mt3 box-shadow--blur about-user">
                    <h5 className="title-user m0">About</h5>
                    <p>
                        Until now 30/9/2018, I have more than 2 years experience on the job developer
                        (include: mobile and web (both front-end & back-end)). I also have some knowledge
                        about architecture system. You can look on my CV attached for more details.
                        I'm a interesting, funny, sportive person and have a passion on researching AI and new
                        technologies.
                    </p>
                </section>
                <section className="box-content--user p5 mt3 box-shadow--blur">
                    <h5 className="title-user m0">Experience</h5>
                    <div className="box-content--info mt2">
                        <div className="logo-company">
                            <img src={logoCompany} alt="" width="100" className="img-responsive"/>
                        </div>
                        <div className="content-info">
                            <h6 className="m0">Web Developer (Front-end & Back-end) And Artificial intelligence</h6>
                            <p className="font-size-14">Est rouge, inc</p>
                            <p>Sep 2018 – Present . 11 mos</p>
                            <p className="note">Da Nang, Viet Nam</p>
                            <p>Related technologies: Java (Spring), Javascript, Python, etc.</p>
                        </div>
                    </div>
                    <div className="box-content--info mt2">
                        <div className="logo-company">
                            <img src={logoCompany} alt="" width="100" className="img-responsive"/>
                        </div>
                        <div className="content-info">
                            <h6 className="m0">Web Developer (Front-end & Back-end) And Artificial intelligence</h6>
                            <p className="font-size-14">Est rouge, inc</p>
                            <p>Sep 2018 – Present . 11 mos</p>
                            <p className="note">Da Nang, Viet Nam</p>
                            <p>Related technologies: Java (Spring), Javascript, Python, etc.</p>
                        </div>
                    </div>
                </section>
                <section className="box-content--user p5 box-shadow--blur box-content--education">
                    <h5 className="title-user m0">Education</h5>
                    <div className="box-content--info mt2">
                        <div className="logo-company">
                            <img src={logoCompany} alt="" width="100" className="img-responsive"/>
                        </div>
                        <div className="content-info">
                            <h6 className="m0">Da Nang University of Technology</h6>
                            <p className="font-size-14">Field Of Study, Computer Software Engineering</p>
                            <p className="note">2013 - 2018</p>
                            <p className="note pt2">(PFIEV) Programme de Formation d'Ingénieurs d' Excellence au Viet
                                Nam</p>
                        </div>
                    </div>
                </section>
                <section className="box-content--user p5 mt3 mb3 box-shadow--blur">
                    <h5 className="title-user m0">Interests</h5>
                    <div className="row mt2">
                        <div className="col-md-6">
                            <div className="box-content--info mb2">
                                <div className="logo-company">
                                    <img src={logoFram} alt="" width="50" className="img-responsive"/>
                                </div>
                                <div className="content-info">
                                    <h6 className="m0">fram^</h6>
                                    <p className="note">1,641 followers</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="box-content--info mb2">
                                <div className="logo-company">
                                    <img src={logoCompany} alt="" width="50" className="img-responsive"/>
                                </div>
                                <div className="content-info">
                                    <h6 className="m0">Est rouge, inc</h6>
                                    <p className="note">41 followers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
