import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getTags } from '../services/tags.service';
import { getNameByLanguage } from '../utils/multiple-language';

import { RowWrapper } from './Wrappers';
import Button from '@material-ui/core/Button';

import { tagStyle } from './Tag';

const useStyles = makeStyles(() => tagStyle);

const Wrapper = styled.div`
    min-height: 100px;
    border: 1px solid #b5b5b5;
    border-radius: 4px;
    padding: 20px 10px 10px;
    position: relative;
`;

const Label = styled.div`
    position: absolute;
    top: -10px;
    left: 10px;
    background-color: white;
    padding: 0 5px;
`;

const TagFilter = ({
    category,
    tagsString,
    tagField= 'id',
    usedIn = '',
    onChange
}) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [tagsToSelect, setTagsToSelect] = React.useState([]);

    React.useEffect(() => {
        const params = {
            filter: {
                limit: 100
            }
        };

        if (usedIn) {
            params.filter.used = usedIn;
        }

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
    }, [category, usedIn]);

    const tagsArray = tagsString ? tagsString.split(',') : [];

    const onClickTag = (tag) => () => {
        const index = tagsArray.findIndex((id) => id === tag[tagField]);
        if (tagsArray.includes(tag[tagField]) ) {
            tagsArray.splice(index, 1);
        } else {
            tagsArray.push(tag[tagField]);
        }
        onChange(tagsArray.join(','));
    };

    const tagElements = tagsToSelect.map((tag) => {
        const isActive = tagsArray.includes(tag[tagField]);
        return (
            <Button
                key={tag.id}
                onClick={onClickTag(tag)}
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
