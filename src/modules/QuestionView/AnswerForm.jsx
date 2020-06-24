import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import 'easymde/dist/easymde.min.css';
import SimpleMDEReact from 'react-simplemde-editor';

import Button from '@material-ui/core/Button';

const FormWrapper = styled.div`
    margin: 5px 0;

    & .CodeMirror-wrap{
        height: 200px;
    }
`;

const CenterWrapper = styled.div`
    display: flex;
    justify-content: center;
    & button {
        margin: 0 10px;
    }
`;

const AnswerForm = ({ defaultValue = '', submit, errorAlert, cancel }) => {
    const { t } = useTranslation();

    const [answerBody, setAnswerBody] = React.useState(defaultValue);

    const onSubmit = () => {
        if (answerBody.length < 20) {
            return errorAlert(t('question_answer_min_20'));
        } else {
            submit(answerBody);
        }
    };

    const handleChangeAnswerBody = (value) => {
        if (value.length < 10000) {
            setAnswerBody(value);
        }
    };

    return (
        <FormWrapper>
            <SimpleMDEReact
                value={answerBody}
                onChange={handleChangeAnswerBody}
                options={{
                    autofocus: true,
                    spellChecker: false
                }}
            />
            <CenterWrapper>
                <Button variant="contained" color="secondary" onClick={cancel}>
                    {t('common_cancel')}
                </Button>
                <Button variant="contained" color="primary" onClick={onSubmit}>
                    {t('common_save')}
                </Button>
            </CenterWrapper>
        </FormWrapper>
    );
};

export default AnswerForm;
