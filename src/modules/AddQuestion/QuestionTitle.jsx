import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';

import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

const Wrapper = styled.div``;

const ExampleWrapper = styled.div`
    background-color: #fafafb;
    padding: 20px;
    margin: 20px;
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const iconStyle = css`
    font-size: 14px !important;
    margin-right: 3px;
`;

const CheckIcon = styled(Check)`
    ${iconStyle}
    color: green;
`;

const CloseIcon = styled(Close)`
    ${iconStyle}
    color: red;
`;

const QuestionTitle = ({ title, setTitle }) => {
    const { t } = useTranslation();

    const handleTitle = ev => {
        const { value } = ev.target;
        setTitle(value.replace(/ +/g, ' '));
    };

    return (
        <Wrapper>
            <h3>{t('quetion_what_is_your_title')}</h3>
            <h5>{t('question_your_title_help')}</h5>
            <ExampleWrapper>
                <p>{t('question_imagine_you')}</p>
                <p>{t('common_for_exemple')}</p>
                <FlexWrapper>
                    <CheckIcon /> <div>{t('question_is_there_an_R')}</div>
                </FlexWrapper>
                <FlexWrapper>
                    <CloseIcon /> <div>{t('question_please_help_with_R')}</div>
                </FlexWrapper>
            </ExampleWrapper>
            <TextField
                fullWidth
                label={t('common_title')}
                variant="outlined"
                value={title}
                onChange={handleTitle}
                margin="normal"
            />
        </Wrapper>
    );
};

export default QuestionTitle;
