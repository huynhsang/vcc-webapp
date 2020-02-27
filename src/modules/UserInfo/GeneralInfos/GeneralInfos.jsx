import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Experiences } from './Experiences';
import { Educations } from './Educations';

const GeneralInfos = ({ userInfos }) => {
    const {
        userProfile: { summary }
    } = userInfos;

    return (
        <>
           
            <Experiences />
            <Educations />
        </>
    );
};

const mapStateToProps = ({ userInfos }) => ({
    userInfos
});

export default connect(mapStateToProps)(withRouter(GeneralInfos));
