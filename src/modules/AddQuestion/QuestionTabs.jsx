import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    root: {
        '@media (max-width: 768px)': {
            padding: '10px 0'
        }
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
    'common_category',
    'common_tags',
    'common_title',
    'common_description',
    'common_status',
    'common_review'
];

const QuestionTabs = ({ isBlock = false, activeTab, setActiveTab }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const handleStep = step => () => {
        setActiveTab(step);
    };

    return (
        <Stepper className={classes.root} alternativeLabel nonLinear activeStep={activeTab}>
            {ADD_QUESTION_TABS.map((label, index) => (
                <Step key={label} disabled={isBlock}>
                    <StepButton onClick={handleStep(index)}>
                        {t(label)}
                    </StepButton>
                </Step>
            ))}
        </Stepper>
    );
};

export default QuestionTabs;
