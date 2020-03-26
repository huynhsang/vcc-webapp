import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    stepper: {
        '& .MuiStepConnector-line': {
            minHeight: '10px'
        },
        '@media (max-width: 768px)': {
            padding: '10px'
        }
    },
    stepLabel: {
        '& .MuiStepLabel-active': {
            fontSize: '1rem',
            fontWeight: 400,
        }
    }
}));

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background: white;
`;

const Title = styled.div`
    text-align: center;
    font-size: 1.1em;
    font-weight: bold;
    padding-top: 15px;
`;

const WorkSpace = ({ title, steps = [] }) => {
    const classes = useStyles();
    return (
        <Wrapper>
            {Boolean(title) && <Title>{title}</Title>}
            <Stepper className={classes.stepper} orientation="vertical">
                {steps.map((step, key) => (
                    <Step key={`step-${key}`} active={true}>
                        <StepLabel className={classes.stepLabel}>
                            {step.title}
                        </StepLabel>
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
