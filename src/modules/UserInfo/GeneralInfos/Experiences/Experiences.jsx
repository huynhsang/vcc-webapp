import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import ExperienceModal from './ExperienceModal';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ExperienceRequestBuilder from '../../../../global/ExperienceRequest';
import logoCompany from '../../../../static/resources/img/logo/est-rouge.png';
import logoFram from '../../../../static/resources/img/logo/fram.png';
import CoreService from '../../../../global/CoreService';

import ApplicationUtil from '../../../../common/util/ApplicationUtil';

import {
    showSuccessAlertFn,
    showErrorAlertFn
} from '../../../../actions/sweetAlert';

import { experienceMock } from '../../Mock';

const { experienceService } = CoreService;

const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ExperienceInfo = styled(FlexWrapper)`
    border-top: 1px solid #707885;
    min-width: 80%;
    padding-top: 10px;
`;

const IconWrapper = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    & .pi {
        font-size: 26px;
    }
`;

const Experiences = ({ showErrorNotification, showSuccessNotification }) => {

    const {t} = useTranslation();
    
    const [experiences, setExperiences] = React.useState([]);

    const [isShowing, setIsShowing] = React.useState(false);

    React.useEffect(() => {
        setExperiences([experienceMock]);
    }, []);

    const onSubmit = ({
        title,
        employment,
        company,
        location,
        isWorking,
        startDate,
        endDate,
        description
    }) => {
        const registerExperience = ExperienceRequestBuilder.build(
            title,
            employment.label,
            company,
            location,
            isWorking,
            startDate,
            endDate,
            description
        );
        experienceService.create(registerExperience).then((result: Result) => {
            if (result.success) {
                showSuccessNotification('Success!', 'Leaved an answer');
            } else {
                showErrorNotification(result.data);
            }
        });
    };

    const experiencesRender = experiences.map(val => (
        <FlexWrapper key={val.id} className="box-content--info mt2">
            <div className="logo-company">
                <img
                    src={logoCompany}
                    alt=""
                    width="100"
                    className="img-responsive"
                />
            </div>
            <ExperienceInfo>
                <div>
                    <h6 className="m0 mr6">{val.title}</h6>
                    <p className="font-size-14">{val.company}</p>
                    <p>Sep 2018 – Present . 11 mos</p>
                    <p className="note">{val.location}</p>
                    <p>{val.description}</p>
                </div>
                <IconWrapper className="experience--icon">
                    <i className="pi pi-pencil" />
                </IconWrapper>
            </ExperienceInfo>
        </FlexWrapper>
    ));

    return (
        <section className="box-content--user p5 mt3 box-shadow--blur">
            <FlexWrapper>
                <h5 className="title-user m0">Experience</h5>
                <IconWrapper
                    className="experience--icon"
                    onClick={() => setIsShowing(true)}
                >
                    <i className="pi pi-plus" />
                </IconWrapper>
            </FlexWrapper>

            {experiencesRender}
            <ExperienceModal
                submit={onSubmit}
                isShowing={isShowing}
                setIsShowing={setIsShowing}
            />
        </section>
    );
};

const mapStateToProps = ({ App: { isAuthenticated } }) => ({
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
)(withRouter(Experiences));
