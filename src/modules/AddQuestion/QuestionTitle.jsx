import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';

import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled.div``;

const ExampleWrapper = styled.div`
    background-color: #fafafb;
    padding: 20px;
    margin: 20px 10px;

    ${media.mobileLandscape`
        padding: 10px;
        margin: 0 0 10px 0;
    `}
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 5px;
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
            <h4>{t('question_your_title_help')}</h4>
            <ExampleWrapper>
                <div><b>{`${t('common_for_exemple')}: `}</b> {t('question_imagine_you')}</div>
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
