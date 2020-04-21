import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getTags } from '../../services/tags.service';
import { getNameByLanguage } from '../../utils/multiple-language';

import { RowWrapper } from '../../component/Wrappers';
import Button from '@material-ui/core/Button';

import { tagStyle } from '../../component/Tag';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const useStyles = makeStyles(() => tagStyle);

const Wrapper = styled.div`
    width: 30%;
    min-height: 100px;
    border: 1px solid #b5b5b5;
    border-radius: 4px;
    padding: 20px 10px 10px;
    position: relative;

    ${media.mobileLandscape`
        width: 100%;
        min-height: 0;
        margin-top: 15px;
    `}
`;

const Label = styled.div`
    position: absolute;
    top: -10px;
    left: 10px;
    background-color: white;
    padding: 0 5px;
`;

const TagFilter = ({ category, tags, onChangeFilter }) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [tagsToSelect, setTagsToSelect] = React.useState([]);

    React.useEffect(() => {
        const params = {
            filter: {
                used: 'question',
                limit: 100
            }
        };
        if (category) {
            params.filter.categorySlug = category;
        }

        getTags(params)
            .then((data) => {
                setTagsToSelect(data.filter(Boolean));
            })
            .catch((err) => {
                console.log(err);
            });
    }, [category]);

    const tagIds = tags ? tags.split(',') : [];

    const onClickTag = (tagId) => () => {
        const index = tagIds.findIndex((id) => id === tagId);
        if (index !== -1) {
            tagIds.splice(index, 1);
        } else {
            tagIds.push(tagId);
        }
        onChangeFilter({ tags: tagIds.join(',') });
    };

    const tagElements = tagsToSelect.map((tag) => {
        const isActive = tagIds.includes(tag.id);
        return (
            <Button
                key={tag.id}
                onClick={onClickTag(tag.id)}
                size="small"
                variant="contained"
                className={`${classes.button} ${
                    isActive && classes.activeButton
                }`}
            >
                {getNameByLanguage(tag)}
            </Button>
        );
    });

    return (
        <Wrapper>
            <Label>{t('common_tags')} </Label>
            <RowWrapper>{tagElements}</RowWrapper>
        </Wrapper>
    );
};

export default TagFilter;
