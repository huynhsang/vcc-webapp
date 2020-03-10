import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getTags, getTagsRelatingCategory } from '../../services/tags.service';
import { getNameByLanguage } from '../../utils/multiple-language';

import { RowWrapper } from '../../component/Wrappers';
import Button from '@material-ui/core/Button';

import { tagStyle } from '../../component/Tag';

const useStyles = makeStyles(() => tagStyle);

const Wrapper = styled.div`
    border: 1px solid #b5b5b5;
    border-radius: 4px;
    padding: 20px 10px 10px;
    margin: 5px 0 15px;
    position: relative;
`;

const Label = styled.div`
    position: absolute;
    top: -10px;
    left: 10px;
    background-color: white;
    padding: 0 5px;
`;

const TagWrapper = styled.div`
    transition: border 0.2s linear, color 0.2s linear,
        background-color 0.2s linear;
    border-radius: 2px;
    font-size: 11px;
    font-weight: 400;
    margin-bottom: 6px;
    margin-right: 6px;
    display: block;
    float: left;
    padding: 0 6px;
    cursor: pointer;

    border: 1px solid;
    border-color: ${p => (p.isActive ? '#6a758c' : '#e1e3e3')};
    color: ${p => (p.isActive ? '#fff' : '#7c7f85')};
    background-color: ${p => p.isActive && '#6a758c'};

    &:hover {
        border-color: ${p => !p.isActive && '#2d6ff7'};
        background-color: ${p => !p.isActive && '#2d6ff7'};
        color: #fff;
    }
`;

const TagFilter = ({ category, tags, onChangeFilter }) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [tagsToSelect, setTagsToSelect] = React.useState([]);

    React.useEffect(() => {
        if (!category) {
            getTags()
                .then(data => {
                    setTagsToSelect(data);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            getTagsRelatingCategory(category)
                .then(data => {
                    setTagsToSelect(data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [category]);

    const tagIds = tags ? tags.split(',') : [];

    const onClickTag = tagId => () => {
        const index = tagIds.findIndex(id => id === tagId);
        if (index !== -1) {
            tagIds.splice(index, 1);
        } else {
            tagIds.push(tagId);
        }
        onChangeFilter({ tags: tagIds.join(',') });
    };

    const tagElements = tagsToSelect.map(tag => {
        const isActive = tagIds.includes(tag.id);
        return (
            <Button
                key={tag.id}
                onClick={onClickTag(tag.id)}
                size="small"
                variant="contained"
                className={`${classes.button} ${isActive &&
                    classes.activeButton}`}
            >
                {getNameByLanguage(tag)}
            </Button>
        );
    });

    return (
        <Wrapper>
            <Label>{t('common_trending_tags')} </Label>
            <RowWrapper>{tagElements}</RowWrapper>
        </Wrapper>
    );
};

export default TagFilter;
