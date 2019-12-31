import React from 'react';
import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

const Wrapper = styled.div`
    width: 100%;
    background: white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
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
            <Title>{title}</Title>
            <Stepper orientation="vertical">
                {steps.map(step => (
                    <Step key={step.title} active={true}>
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
