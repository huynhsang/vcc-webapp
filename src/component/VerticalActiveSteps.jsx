import React from 'react';
import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background: white;
`;

const Title = styled.div`
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    padding-top: 15px;
`;

const WorkSpace = ({ title, steps = [] }) => {
    return (
        <Wrapper>
            {Boolean(title) && <Title>{title}</Title>}
            <Stepper orientation="vertical">
                {steps.map((step, key) => (
                    <Step key={`step-${key}`} active={true}>
                        <StepLabel>{step.title}</StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Wrapper>
    );
};

export default WorkSpace;
