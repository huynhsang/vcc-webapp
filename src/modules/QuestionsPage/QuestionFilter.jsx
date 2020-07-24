import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import QuestionSort from './QuestionSort';
import { SwitchInput, SearchText } from '../../component/Inputs';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const FlexWrapper = styled.div`
    display: flex;
    ${media.mobileLandscape`
        display: block;
    `}
`;

const FlexMargin = styled(FlexWrapper)`
    margin-top: 10px;
`;

const SearchTextWrapper = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    min-height: 0;
    ${media.mobileLandscape`
        width: 100%;
        margin-top: 15px;
    `}
`;

const QuestionFilter = ({
    isAuthenticated,
    show,
    text,
    onChangeFilter,
    askme,
    mime,
    noanswer
}) => {
    const { t } = useTranslation();

    const onAskmeAndMimeChange = name => val => {
        const obj = val ? { mime: false, askme: false } : {};
        obj[name] = val;
        onChangeFilter(obj);
    };

    return (
        <>
            <FlexWrapper>
                <QuestionSort show={show} onChangeFilter={onChangeFilter} />
                <SearchTextWrapper>
                    <SearchText
                        text={text}
                        setText={val => onChangeFilter({ text: val })}
                        label={t('question_search_question')}
                    />
                </SearchTextWrapper>
            </FlexWrapper>
            <FlexMargin>
                <SwitchInput
                    label={t('questions_no_answers')}
                    isChecked={noanswer === 'true'}
                    handleChange={val => onChangeFilter({ noanswer: val })}
                />
                {isAuthenticated && (
                    <>
                        <SwitchInput
                            label={t('questions_my_questions')}
                            isChecked={mime === 'true'}
                            handleChange={onAskmeAndMimeChange('mime')}
                        />
                        <SwitchInput
                            label={t('questions_ask_me')}
                            isChecked={askme === 'true'}
                            handleChange={onAskmeAndMimeChange('askme')}
                        />
                    </>
                )}
            </FlexMargin>
        </>
    );
};

export default QuestionFilter;
