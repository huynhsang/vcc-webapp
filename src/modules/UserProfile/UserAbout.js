import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BasicComponent from '../../common/abstract/component/BasicComponent';
import Modal from '../../component/modal/modal';
import logoCompany from '../../static/resources/img/logo/est-rouge.png';
import logoFram from '../../static/resources/img/logo/fram.png';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import ExperienceRequestBuilder from '../../global/ExperienceRequest'
import CoreService from '../../global/CoreService';
import Result from '../../global/Result';

import ApplicationUtil from '../../common/util/ApplicationUtil';
import {
    showSuccessAlertFn,
    showErrorAlertFn
} from '../../actions/sweetAlert';

const { experienceService } = CoreService;

const UserAbout = ({
    showErrorNotification,
    showSuccessNotification
}) => {
    const [isShowing, setIsShowing] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [employment, setIsEmloyment] = React.useState(0);
    const [company, setCompany] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [isWorking, setIsWorking] = React.useState(false);
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState(new Date());
    const [description, setDescription] = React.useState('');

    // const [experiencesEditted, setExperiencesEditted] = React.useState(experiences);
    

    const openModalHandler = () => {
        setIsShowing(true);
        //TODO: use in file css
        document.body.style.overflow = 'hidden';
    };

    const closeModalHandler = () => {
        setIsShowing(false);
        document.body.style.overflow = 'unset';
    };
    const employments = [
        { label: '-', value: '0' },
        { label: 'Full-time', value: '1' },
        { label: 'Part-time', value: '2' },
        { label: 'Self-employed', value: '3' },
        { label: 'Freelance', value: '4' },
        { label: 'Contract', value: '5' },
        { label: 'Internship', value: '6' },
        { label: 'Apprenticeship', value: '7' }
    ];

    
    const onSubmit = event => {
        event.preventDefault();
        const registerExperience = ExperienceRequestBuilder.build(
            title,
            employment.label,
            company,
            location,
            isWorking,
            startDate,
            endDate,
            description
        )
        experienceService.create(registerExperience).then((result: Result) => {
            if (result.success) {
                // const experiences = experiencesEditted || [];
                // experiences.unshift(result.data);
                showSuccessNotification('Success!', 'Leaved an answer');
                // setExperiencesEditted(experiences);
            } else {
                showErrorNotification(result.data);
            }
        })
    };
    return (
        <div>
            {isShowing ? (
                <div onClick={closeModalHandler} className="back-drop"></div>
            ) : null}
            <Modal show={isShowing} close={closeModalHandler}>
                <div className="modal-header">
                    <h4>Experience</h4>
                    <span className="close-modal-btn" onClick={closeModalHandler}>
                        <svg
                            viewBox="0 0 24 24"
                            width="24px"
                            height="24px"
                            x="0"
                            y="0"
                        >
                            <path d="M20,5.32L13.32,12,20,18.68,18.66,20,12,13.33,5.34,20,4,18.68,10.68,12,4,5.32,5.32,4,12,10.69,18.68,4Z" />
                        </svg>
                    </span>
                </div>
                <div className="modal-body">
                    <div>
                        <label> Title <span className="required">*</span></label>
                        <input
                            type="text"
                            placeholder="Ex: Manager"
                            onChange={ev => setTitle(ev.target.value)}
                        />
                        <span className="required"> Please enter your title. </span>
                    </div>
                    <div className="mt1">
                        <label>Employment type</label>
                        <Dropdown
                            value={employment}
                            options={employments}
                            onChange={e => setIsEmloyment(e.value)}
                            placeholder="-"
                            optionLabel="label"
                        />
                    </div>
                    <div className="mt1">
                        <label> Company <span className="required">*</span></label>
                        <input
                            type="text"
                            onChange={ev => setCompany(ev.target.value)}
                        />
                        <span className="required"> Please enter your title.</span>
                    </div>
                    <div className="mt1">
                        <label>Location</label>
                        <input
                            type="text"
                            onChange={ev => setLocation(ev.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            id="work-1"
                            type="checkbox"
                            onChange={ev => setIsWorking(ev.target.checked)}
                        />
                        <label htmlFor="work-1">I am currently working in this role</label>
                    </div>
                    <div className="row mt1">
                        <div className="col-sm-6">
                            <label>Start Date <span className="required">*</span></label>
                            <div>
                                <Calendar
                                    value={startDate}
                                    placeholder='mm/dd/YY'
                                    onChange={ev => setStartDate(ev.value)}
                                />
                            </div>
                            <span className="required">Please enter a start date.</span>
                        </div>
                        <div className="col-sm-6">
                            <label>End Date <span className="required">*</span></label>
                            {isWorking ? <div className="end-date"><i>Present</i></div> :
                                <div>
                                    <Calendar
                                        value={endDate}
                                        onChange={ev => setEndDate(ev.value)}
                                    />
                                </div>
                            }
                            <span className="required">Please enter a end date.</span>
                        </div>
                    </div>
                    <div className="mt1">
                        <label>Description </label>
                        <textarea
                            rows="6"
                            onChange={ev => setDescription(ev.target.value)}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" onClick={onSubmit}>Save</button>
                </div>
            </Modal>
            <section className="box-content--user p5 mt3 box-shadow--blur about-user">
                <h5 className="title-user m0">About</h5>
                <p>
                    Until now 30/9/2018, I have more than 2 years experience on
                    the job developer (include: mobile and web (both front-end &
                    back-end)). I also have some knowledge about architecture
                    system. You can look on my CV attached for more details. I'm
                    a interesting, funny, sportive person and have a passion on
                    researching AI and new technologies.
                </p>
            </section>
            <section className="box-content--user p5 mt3 box-shadow--blur position-relative">
                <h5 className="title-user m0">Experience</h5>
                <a
                    className="experience--icon experience--add"
                    onClick={openModalHandler}
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="24px"
                        height="24px"
                        x="0"
                        y="0"
                    >
                        <path d="M21,13H13v8H11V13H3V11h8V3h2v8h8v2Z" />
                    </svg>
                </a>
                <div className="box-content--info mt2">
                    <div className="logo-company">
                        <img
                            src={logoCompany}
                            alt=""
                            width="100"
                            className="img-responsive"
                        />
                    </div>
                    <div className="content-info position-relative">
                        <h6 className="m0 mr6">
                            Web Developer (Front-end & Back-end) And Artificial
                            intelligence
                        </h6>
                        <p className="font-size-14">Est rouge, inc</p>
                        <p>Sep 2018 – Present . 11 mos</p>
                        <p className="note">Da Nang, Viet Nam</p>
                        <p>
                            Related technologies: Java (Spring), Javascript,
                            Python, etc.
                        </p>
                        <a className="experience--icon experience--edit">
                            <svg
                                viewBox="0 0 24 24"
                                width="24px"
                                height="24px"
                                x="0"
                                y="0"
                            >
                                <path d="M21.71,5L19,2.29a1,1,0,0,0-1.41,0L4,15.85,2,22l6.15-2L21.71,6.45A1,1,0,0,0,22,5.71,1,1,0,0,0,21.71,5ZM6.87,18.64l-1.5-1.5L15.92,6.57l1.5,1.5ZM18.09,7.41l-1.5-1.5,1.67-1.67,1.5,1.5Z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="box-content--info mt2">
                    <div className="logo-company">
                        <img
                            src={logoCompany}
                            alt=""
                            width="100"
                            className="img-responsive"
                        />
                    </div>
                    <div className="content-info position-relative">
                        <h6 className="m0 mr6">
                            Web Developer (Front-end & Back-end) And Artificial
                            intelligence
                        </h6>
                        <p className="font-size-14">Est rouge, inc</p>
                        <p>Sep 2018 – Present . 11 mos</p>
                        <p className="note">Da Nang, Viet Nam</p>
                        <p>
                            Related technologies: Java (Spring), Javascript,
                            Python, etc.
                        </p>
                        <a className="experience--icon experience--edit">
                            <svg
                                viewBox="0 0 24 24"
                                width="24px"
                                height="24px"
                                x="0"
                                y="0"
                            >
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
                        <img
                            src={logoCompany}
                            alt=""
                            width="100"
                            className="img-responsive"
                        />
                    </div>
                    <div className="content-info">
                        <h6 className="m0">Da Nang University of Technology</h6>
                        <p className="font-size-14">
                            Field Of Study, Computer Software Engineering
                        </p>
                        <p className="note">2013 - 2018</p>
                        <p className="note pt2">
                            (PFIEV) Programme de Formation d'Ingénieurs d'
                            Excellence au Viet Nam
                        </p>
                    </div>
                </div>
            </section>
            <section className="box-content--user p5 mt3 mb3 box-shadow--blur">
                <h5 className="title-user m0">Interests</h5>
                <div className="row mt2">
                    <div className="col-md-6">
                        <div className="box-content--info mb2">
                            <div className="logo-company">
                                <img
                                    src={logoFram}
                                    alt=""
                                    width="50"
                                    className="img-responsive"
                                />
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
                                <img
                                    src={logoCompany}
                                    alt=""
                                    width="50"
                                    className="img-responsive"
                                />
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
};


const mapStateToProps = ({ AppAuth: {isAuthenticated} }) => ({
    isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    showErrorNotification: data =>
        dispatch(showErrorAlertFn('Error!', ApplicationUtil.getErrorMsg(data))),
    showSuccessNotification: (title, text) =>
        dispatch(showSuccessAlertFn(title, text))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(UserAbout));

