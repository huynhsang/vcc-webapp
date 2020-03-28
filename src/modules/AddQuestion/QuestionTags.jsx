import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import Check from '@material-ui/icons/Check';

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
    margin-top: 10px;
`;

const iconStyle = css`
    font-size: 14px !important;
    margin-right: 3px;
`;

const CheckIcon = styled(Check)`
    ${iconStyle}
    color: green;
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
            <h3>{t('question_tags_help_the_right_people')}</h3>
            <ExampleWrapper>
                <div>
                    <b>{`${t('common_for_exemple')}: `}</b>
                    {t('question_tags_developer_life')}
                </div>
                <FlexWrapper>
                    <CheckIcon />{' '}
                    <div>
                        {`${t('common_tags')}: `} {t('question_tags_example')}
                    </div>
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
