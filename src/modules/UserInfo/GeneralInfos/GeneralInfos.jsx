import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoCompany from '../../../static/resources/img/logo/est-rouge.png';
import logoFram from '../../../static/resources/img/logo/fram.png';
import CoreService from '../../../global/CoreService';
import Result from '../../../global/Result';

import ApplicationUtil from '../../../common/util/ApplicationUtil';
import {
    showSuccessAlertFn,
    showErrorAlertFn
} from '../../../actions/sweetAlert';
import { Experiences } from './Experiences';
import { Educations } from './Educations';

const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const SummaryWrapper = styled.section`
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    background: white;
    border-radius: 2px;
    & p {
        text-align:justify;
        padding: 0 25px;
    }
`;

const SignWrapper = styled.div`
    text-align: ${p => p.textAlign};
    font-size: 40px;
`;

const GeneralInfos = ({
    profile,
    showErrorNotification,
    showSuccessNotification
}) => {
    // const [experiencesEditted, setExperiencesEditted] = React.useState(experiences);

    const { t } = useTranslation();

    const { summary } = profile;

    return (
        <>
            <SummaryWrapper className="p5 mt3">
                <SignWrapper>“</SignWrapper>
                <p>{summary}</p>
                <SignWrapper textAlign="right">”</SignWrapper>
            </SummaryWrapper>
            <Experiences />
            <Educations />
        </>
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
)(withRouter(GeneralInfos));
