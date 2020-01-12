import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getTags } from '../../services/tags.service';
import Tag from '../../component/Tag';

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

const TagFilter = ({ category, tags }) => {
    const { t } = useTranslation();
    const [tagsToSelect, setTagsToSelect] = React.useState([]);

    React.useEffect(() => {
        const filter = category
            ? {
                  where: {
                      type: category
                  }
              }
            : {};
        getTags({ filter })
            .then(data => {
                setTagsToSelect(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [category]);

    const tagElements = tagsToSelect.map(tag => {
        return <Tag key={tag.id} tag={tag} />;
    });

    return (
        <Wrapper>
            <Label>{t('common_trending_tags')} </Label>
            <div className="row">{tagElements}</div>
        </Wrapper>
    );
};

export default TagFilter;
