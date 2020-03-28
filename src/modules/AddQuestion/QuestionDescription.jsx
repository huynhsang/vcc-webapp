import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import SimpleMDEReact from 'react-simplemde-editor';

const Wrapper = styled.div``;

const QuestionDescription = ({ setBody, body }) => {
    const { t } = useTranslation();

    const [questionBody, setQuestionBody] = React.useState(body);

    const onChangeHandler = value => {
        setQuestionBody(value);
        setBody(value);
    };

    return (
        <Wrapper>
            <h3>{t('question_tell_us_your_questions')}</h3>
            <h4>{t('question_your_description')}</h4>
            <SimpleMDEReact
                value={questionBody}
                onChange={onChangeHandler}
                options={{
                    autofocus: true,
                    spellChecker: false
                }}
            />
        </Wrapper>
    );
};

export default QuestionDescription;
