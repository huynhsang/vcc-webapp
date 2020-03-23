import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SimpleMDEReact from 'react-simplemde-editor';

import School from '@material-ui/icons/School';

const Wrapper = styled.div``;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const SchoolIcon = styled(School)`
    font-size: 14px !important;
    margin-right: 3px;
`;

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
            <FlexWrapper>
                <SchoolIcon />{' '}
                <div>
                    <b>{t('question_want_more_help')}</b>{' '}
                    {t('question_check_out_these_examples')}:
                    <Link to="/"> Example 1</Link>,
                    <Link to="/"> Example 2</Link>
                </div>
            </FlexWrapper>
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
