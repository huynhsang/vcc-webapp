import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getTags } from '../../services/tags.service';
import { getNameByLanguage } from '../../utils/multiple-language';
import {
    borderTop,
    borderBottom,
    borderLeft,
    borderRight
} from '../../utils/animation-keyframes';

const Wrapper = styled.div`
    position: relative;
    border-radius: 3px;
    margin-bottom: 10px;
`;

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: 600;

    display: flex;
    align-items: center;
    & svg {
        font-size: 15px;
        margin-right: 5px;
    }
`;

const TagsWrapper = styled.div`
    display: flex;
    margin: 0 -10px;
    flex-wrap: wrap;
    margin-top: 5px;
`;

const Tag = styled.div`
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    padding: 0 8px;
    margin: 10px;
    border-radius: 3px;
    white-space: nowrap;
    background-color: white;

    cursor: pointer;
    user-select: none;

    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
    }
    &:active {
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
    }
`;

const BorderWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
`;

const BorderTop = styled.div`
    position: absolute;
    top: -2px;
    left: -2px;
    height: 2px;
    animation: ${borderTop} 8s linear infinite;
    background: #6d6743;
`;

const BorderRight = styled.div`
    position: absolute;
    top: -2px;
    right: -2px;
    width: 2px;
    animation: ${borderRight} 8s linear infinite;
    background: #6d6743;
`;

const BorderBottom = styled.div`
    position: absolute;
    bottom: -2px;
    right: -2px;
    height: 2px;
    animation: ${borderBottom} 8s linear infinite;
    background: #6d6743;
`;

const BorderLeft = styled.div`
    position: absolute;
    bottom: -2px;
    left: -2px;
    width: 2px;
    animation: ${borderLeft} 8s linear infinite;
    background: #6d6743;
`;

const ContentWrapper = styled.div`
    position: relative;
    padding: 10px;
`;

const TrendingTags = ({ history }) => {
    const { t } = useTranslation();
    const [tags, setTags] = React.useState([]);

    React.useEffect(() => {
        getTags({
            filter: {
                limit: 6,
                used: 'question'
            }
        })
            .then((data) => {
                setTags(data.filter(Boolean));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const onClickTag = (tagId) => () => {
        history.push(`/topics?tags=${tagId}`);
    };

    const tagsRender = tags.map((tag) => (
        <Tag key={tag.id} onClick={onClickTag(tag.id)}>
            {getNameByLanguage(tag)}
        </Tag>
    ));

    return (
        <Wrapper>
            <BorderWrapper>
                <BorderTop />
                <BorderRight />
                <BorderBottom />
                <BorderLeft />
            </BorderWrapper>
            <ContentWrapper>
                <Title>{t('common_trending_tags')}</Title>
                <TagsWrapper>{tagsRender}</TagsWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};

export default TrendingTags;
