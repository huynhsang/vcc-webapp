import React from 'react';
import BasicComponent from '../../../common/abstract/component/BasicComponent';
import Modal from '../../../component/modal/modal';
import avatar from '../../../static/resources/img/avatar-sang.jpg';
import PropTypes from "prop-types";
import { Link, Route } from "react-router-dom";

const propTypes = {
    getProfileById: PropTypes.func.isRequired,
};
export default class UserProfile extends BasicComponent {
    constructor(props) {
        super(props);
        const profile: User = {};
        this.state = {
            isShowing: false,
            profile: profile
        }
    }

    openModalHandler = () => {
        this.setState({
            isShowing: true
        });
        document.body.style.overflow = 'hidden';
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
        document.body.style.overflow = 'unset';
    }
    handleBeforeTheFirstRender(): void {
        const userId: number = parseInt(window.location.pathname.split('/')[2]);
        if (userId) {
            this.props.getProfileById(userId, this)
        } 
        else {
            window.location = '/'
        }
    }
    render() {
        const _this = this;
        return (
            <div className="container discy-container">
                {this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null}
                <Modal
                    show={this.state.isShowing}
                    close={this.closeModalHandler}
                >
                    <div className="modal-header">
                        <h4>Experience</h4>
                        <span className="close-modal-btn" onClick={this.closeModalHandler}>
                            <svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0">
                                <path d="M20,5.32L13.32,12,20,18.68,18.66,20,12,13.33,5.34,20,4,18.68,10.68,12,4,5.32,5.32,4,12,10.69,18.68,4Z" />
                            </svg>
                        </span>
                    </div>
                    <div className="modal-body">
                        <div>
                            <label>Title <span className="required">*</span></label>
                            <input type="text" placeholder="Ex: Manager" />
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
                            <label htmlFor="work-1">I am currently working in this role</label>
                        </div>
                        <div>
                            <input id="industry-1" type="checkbox" />
                            <label htmlFor="industry-1">Update my industry</label>
                        </div>
                        <div>
                            <input id="headline-1" type="checkbox" />
                            <label htmlFor="headline-1">Update my headline</label>
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
                <div className="row"

                >
                    <section className="profile-background-image box-shadow--blur" style={{
                        backgroundImage: "url(" + require(`../../../static/resources/img/bg-user.jpg`) + ")",
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}>
                    </section>
                    <section className="user-container info-user box-shadow--blur position-relative col-md-3">
                        <div className="avatar-user">
                            <img src={ this.state.profile.avatar } width="200" alt="" className="img-responsive" />
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
                                <Link to="/" className="title-info">About<i className="fas fa-arrow-right"></i></Link>
                                <Link to="/" className="title-info">Education<i className="fas fa-arrow-right"></i></Link>
                                <Link to="/" className="title-info">Experience<i className="fas fa-arrow-right"></i></Link>
                                <Link to="/" className="title-info">Quetions<i className="fas fa-arrow-right"></i></Link>
                                <Link to="/" className="title-info">Answer<i className="fas fa-arrow-right"></i></Link>
                            </div>
                        </div>
                    </section>
                    <div className="user-container col-md-9 responsive-user">

                        {this.props.subRoutes.map((route, index) => {
                            return (
                                <Route key={index} exact={route.exact} path={route.path}
                                    render={props => (
                                        <route.component {...props} openModalHandler={_this.openModalHandler}/>
                                    )}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>

        );
    }
}
UserProfile.proptypes = propTypes;
