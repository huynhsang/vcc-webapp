import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

import Autocomplete from '@material-ui/lab/Autocomplete';
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

const QuestionTags = ({ tags, tagIds, setTagIds }) => {
    const { t } = useTranslation();

    if (!tags) {
        return <div />;
    }

    const handleTags = (ev, value) => {
        setTagIds(value ? value.map(val => val.id) : []);
    };

    const defaultTags = tags.filter(val => tagIds.includes(val.id));

    return (
        <Wrapper>
            <h3>{t('question_what_languages_technologies')}</h3>
            <h4>{t('question_tags_help_the_right_people')}</h4>
            <ExampleWrapper>
                <p>{t('question_identify_your_tags')}</p>
                <p>{t('common_for_exemple')}:</p>
                <FlexWrapper>
                    <CheckIcon /> <div>{t('question_include_tags_that')}</div>
                </FlexWrapper>
                <FlexWrapper>
                    <CloseIcon /> <div>{t('question_only_included_in')}</div>
                </FlexWrapper>
            </ExampleWrapper>
            <Autocomplete
                multiple
                options={tags}
                getOptionLabel={tag => tag.nameEn}
                value={defaultTags}
                filterSelectedOptions
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label={t('common_tags')}
                        placeholder="Tag"
                    />
                )}
                onChange={handleTags}
            />
        </Wrapper>
    );
};

export default QuestionTags;
