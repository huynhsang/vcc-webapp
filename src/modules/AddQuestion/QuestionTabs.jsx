import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    button: {
        marginRight: theme.spacing(1)
    },
    backButton: {
        marginRight: theme.spacing(1)
    },
    completed: {
        display: 'inline-block'
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

export const ADD_QUESTION_TABS = [
    'common_type',
    'common_tags',
    'common_title',
    'common_description',
    'common_review'
];

const QuestionTabs = ({ isBlock = false, activeTab, setActiveTab }) => {
    const classes = useStyles();

    const handleStep = step => () => {
        setActiveTab(step);
    };

    return (
        <div className={classes.root}>
            <Stepper alternativeLabel nonLinear activeStep={activeTab}>
                {ADD_QUESTION_TABS.map((label, index) => (
                    <Step key={label} disabled={isBlock}>
                        <StepButton onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default QuestionTabs;
