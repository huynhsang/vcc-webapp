import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import 'easymde/dist/easymde.min.css';
import SimpleMDEReact from 'react-simplemde-editor';

import Button from '@material-ui/core/Button';

const CenterWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
    & button {
        margin: 0 10px;
    }
`;

const FormWrapper = styled.div`
    margin: 20px 0;
`;

const AnswerForm = ({
    questionId,
    reloadQuestion,
    isAuthenticated,
    createAnswer,
    errorAlert,
    showLoginConfirm,
    isCreatingAnswer,
    isFetchingError
}) => {
    const { t } = useTranslation();

    const [isMounted, setIsMounted] = React.useState(false);

    const [leaveAnswer, setLeaveAnswer] = React.useState(false);
    const [answerBody, setAnswerBody] = React.useState('');

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    React.useEffect(() => {
        if (isMounted && !isFetchingError) {
            reloadQuestion();
            setLeaveAnswer(false);
            setAnswerBody('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCreatingAnswer]);

    const leaveAnswerValidation = () => {
        if (!isAuthenticated) {
            return showLoginConfirm();
        }
        setLeaveAnswer(true);
    };

    const onSubmit = () => {
        if (answerBody.length < 20) {
            return errorAlert(t('question_answer_min_20'));
        }
        createAnswer(questionId, answerBody);
    };

    const handleChangeAnswerBody = value => {
        if (value.length < 10000) {
            setAnswerBody(value);
        }
    };

    if (!leaveAnswer) {
        return (
            <CenterWrapper>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={leaveAnswerValidation}
                >
                    {t('answer_leave_answer')}
                </Button>
            </CenterWrapper>
        );
    }

    return (
        <FormWrapper>
            <h3>{t('answer_leave_answer')}</h3>
            <SimpleMDEReact
                value={answerBody}
                onChange={handleChangeAnswerBody}
                options={{
                    autofocus: true,
                    spellChecker: false
                }}
            />
            <CenterWrapper>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setLeaveAnswer(false)}
                >
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={onSubmit}>
                    Submit
                </Button>
            </CenterWrapper>
        </FormWrapper>
    );
};

export default AnswerForm;
