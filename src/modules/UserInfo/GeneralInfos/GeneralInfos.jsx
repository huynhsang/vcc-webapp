import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Experiences } from './Experiences';
import { Educations } from './Educations';

const SummaryWrapper = styled.section`
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.2);
    background: white;
    border-radius: 2px;
    & p {
        text-align: justify;
        padding: 0 25px;
    }
`;

const SignWrapper = styled.div`
    text-align: ${p => p.textAlign};
    font-size: 40px;
`;

const GeneralInfos = ({ userInfos }) => {
    const {
        userProfile: { summary }
    } = userInfos;

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

const mapStateToProps = ({ userInfos }) => ({
    userInfos
});

export default connect(mapStateToProps)(withRouter(GeneralInfos));
