import React from 'react';
import BasicComponent from '../../../common/abstract/component/BasicComponent';
import Modal from '../../../component/modal/modal';
import avatar from '../../../static/resources/img/avatar-sang.jpg';
import logoCompany from '../../../static/resources/img/logo/est-rouge.png';
import logoFram from '../../../static/resources/img/logo/fram.png';

export default class UserProfile extends BasicComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowing: false
        }
    }

    openModalHandler = () => {
        this.setState({
            isShowing: true
        });
        document.body.style.overflow = 'hidden';
    };

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
        document.body.style.overflow = 'unset';
    };

    render() {
        return (
            <div>
                {this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null}
                <Modal
                    show={this.state.isShowing}
                    close={this.closeModalHandler}
                >
                    <div className="modal-header">
                        <h4>Modal Header</h4>
                        <span className="close-modal-btn" onClick={this.closeModalHandler}>
                            <svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0">
                                <path d="M20,5.32L13.32,12,20,18.68,18.66,20,12,13.33,5.34,20,4,18.68,10.68,12,4,5.32,5.32,4,12,10.69,18.68,4Z" />
                            </svg>
                        </span>
                    </div>
                    <div className="modal-body">
                        <div>
                            <label>Title <span className="required">*</span></label>
                            <input type="text" placeholder="Ex: Manager"/>
                            <span className="required">Please enter your title.</span>
                        </div>
                        <div className="mt1">
                            <label>Company <span className="required">*</span></label>
                            <input type="text" />
                            <span className="required">Please enter your title.</span>
                        </div>
                        <div className="mt1">
                            <label>Location</label>
                            <input type="text" />
                        </div>
                        <div>
                            <input id="work-1" type="checkbox" />
                            <label for="work-1">I am currently working in this role</label>
                        </div>
                        <div>
                            <input id="industry-1" type="checkbox" />
                            <label for="industry-1">Update my industry</label>
                        </div>
                        <div>
                            <input id="headline-1" type="checkbox" />
                            <label for="headline-1">Update my headline</label>
                        </div>
                        <div className="mt1">
                            <label>Description </label>
                            <textarea rows="6" />
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary">Save</button>
                    </div>
                </Modal>

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
                                <img src={avatar} width="150" alt="" className="img-responsive" />
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
                                        <img src={logoCompany} width="30" alt="" /> &nbsp;
                                        Est rouge, inc
                                </p>
                                    <p>
                                        <img src={logoCompany} width="30" alt="" /> &nbsp;
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
                    <section className="box-content--user p5 mt3 box-shadow--blur position-relative">
                        <h5 className="title-user m0">Experience</h5>
                        <a className="experience--icon experience--add" onClick={this.openModalHandler}>
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
            </div>
        );
    }
}
