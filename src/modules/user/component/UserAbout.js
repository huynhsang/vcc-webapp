import React from 'react';
import BasicComponent from '../../../common/abstract/component/BasicComponent';
import PropTypes from "prop-types";
import logoCompany from '../../../static/resources/img/logo/est-rouge.png';
import logoFram from '../../../static/resources/img/logo/fram.png';

const propTypes = {
    doAbout: PropTypes.func.isRequired
};
export default class UserAbout extends BasicComponent {


    render() {
        const props = this.props;
        return (
            <div>
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
                <section className="box-content--user p5 mt3 box-shadow--blur position-relative">
                    <h5 className="title-user m0">Experience</h5>
                    <a className="experience--icon experience--add" onClick={props.openModalHandler}>
                        <svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" >
                            <path d="M21,13H13v8H11V13H3V11h8V3h2v8h8v2Z" />
                        </svg>
                    </a>
                    <div className="box-content--info mt2">
                        <div className="logo-company">
                            <img src={logoCompany} alt="" width="100" className="img-responsive" />
                        </div>
                        <div className="content-info position-relative">
                            <h6 className="m0 mr6">Web Developer (Front-end & Back-end) And Artificial intelligence</h6>
                            <p className="font-size-14">Est rouge, inc</p>
                            <p>Sep 2018 – Present . 11 mos</p>
                            <p className="note">Da Nang, Viet Nam</p>
                            <p>Related technologies: Java (Spring), Javascript, Python, etc.</p>
                            <a className="experience--icon experience--edit">
                                <svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0">
                                    <path d="M21.71,5L19,2.29a1,1,0,0,0-1.41,0L4,15.85,2,22l6.15-2L21.71,6.45A1,1,0,0,0,22,5.71,1,1,0,0,0,21.71,5ZM6.87,18.64l-1.5-1.5L15.92,6.57l1.5,1.5ZM18.09,7.41l-1.5-1.5,1.67-1.67,1.5,1.5Z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="box-content--info mt2">
                        <div className="logo-company">
                            <img src={logoCompany} alt="" width="100" className="img-responsive" />
                        </div>
                        <div className="content-info position-relative">
                            <h6 className="m0 mr6">Web Developer (Front-end & Back-end) And Artificial intelligence</h6>
                            <p className="font-size-14">Est rouge, inc</p>
                            <p>Sep 2018 – Present . 11 mos</p>
                            <p className="note">Da Nang, Viet Nam</p>
                            <p>Related technologies: Java (Spring), Javascript, Python, etc.</p>
                            <a className="experience--icon experience--edit">
                                <svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0">
                                    <path d="M21.71,5L19,2.29a1,1,0,0,0-1.41,0L4,15.85,2,22l6.15-2L21.71,6.45A1,1,0,0,0,22,5.71,1,1,0,0,0,21.71,5ZM6.87,18.64l-1.5-1.5L15.92,6.57l1.5,1.5ZM18.09,7.41l-1.5-1.5,1.67-1.67,1.5,1.5Z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>
                <section className="box-content--user p5 box-shadow--blur box-content--education">
                    <h5 className="title-user m0">Education</h5>
                    <div className="box-content--info mt2">
                        <div className="logo-company">
                            <img src={logoCompany} alt="" width="100" className="img-responsive" />
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
                                    <img src={logoFram} alt="" width="50" className="img-responsive" />
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
                                    <img src={logoCompany} alt="" width="50" className="img-responsive" />
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
UserAbout.propTypes = propTypes;
