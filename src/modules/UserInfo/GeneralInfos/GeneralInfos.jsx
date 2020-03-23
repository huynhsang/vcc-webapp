import React from 'react';
import styled from 'styled-components';
import { Experiences } from './Experiences';
import { Educations } from './Educations';

const FlexWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const GeneralInfos = () => {
    return (
        <FlexWrapper>
            <Experiences />
            <Educations />
        </FlexWrapper>
    );
};

export default GeneralInfos;
