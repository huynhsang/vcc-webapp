import React from 'react';
import styled, { css } from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { getNameByLanguage } from '../../utils/multiple-language';
import Check from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import { tagStyle } from '../../component/Tag';
import TextField from '@material-ui/core/TextField';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const useStyles = makeStyles(() => ({
    ...tagStyle,
    filterText: {
        marginBottom: '10px'
    }
}));

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

const TagsWrapper = styled.div`
    position: relative;
    border: 1px solid #7d7d7d;
    border-radius: 3px;
    min-height: 50px;
    padding: 15px 10px 5px;
`;

const TagLabel = styled.div`
    position: absolute;
    background-color: white;
    top: -10px;
    left: 10px;
    padding: 0 2px;
    font-size: 12px;
`;

const QuestionTags = ({ tags, tagIds, setTagIds, infoAlert }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const [filterText, setFilterText] = React.useState('');

    if (!tags) {
        return <div />;
    }

    const onClickTag = (tagId) => () => {
        if (tagIds.includes(tagId)) {
            setTagIds(tagIds.filter((val) => val !== tagId));
        } else {
            if (tagIds.length >= 5) {
                infoAlert(t('add_question_max_number_tag', { number: 5 }));
            } else {
                setTagIds([...tagIds, tagId]);
            }
        }
    };

    const activeTags = tags
        .filter((tag) => tagIds.includes(tag.id))
        .map((tag) => {
            return (
                <Button
                    key={tag.id}
                    onClick={onClickTag(tag.id)}
                    size="small"
                    variant="contained"
                    className={`${classes.button} ${classes.activeButton}`}
                >
                    {getNameByLanguage(tag)}
                </Button>
            );
        });

    const tagElements = tags
        .filter((tag) => {
            const isActive = tagIds.includes(tag.id);
            return (
                !isActive &&
                (tag.nameEn.includes(filterText) ||
                    tag.nameVi.includes(filterText))
            );
        })
        .map((tag) => {
            return (
                <Button
                    key={tag.id}
                    onClick={onClickTag(tag.id)}
                    size="small"
                    variant="contained"
                    className={classes.button}
                >
                    {getNameByLanguage(tag)}
                </Button>
            );
        });

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
            <TagsWrapper>
                <TagLabel>{t('common_tags')}</TagLabel>
                <TextField
                    label={t('common_filter')}
                    variant="filled"
                    size="small"
                    fullWidth
                    className={classes.filterText}
                    value={filterText}
                    onChange={(ev) => setFilterText(ev.target.value)}
                />
                {activeTags}
                {tagElements}
            </TagsWrapper>
        </Wrapper>
    );
};

export default QuestionTags;
