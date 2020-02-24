import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { getNameByLanguage } from '../../../utils/multiple-language';

const Wrapper = styled.div`
    background-color: white;
    padding: 10px;
    margin: 10px 0;
    border-radius: 2px;
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    cursor: pointer;
`;

const FlexWrapper = styled.div``;

const InfoTitle = styled.span`
    color: #7c7f85;
    margin-right: 5px;
`;

const TagsWrapper = styled.div`
    margin-top: 8px;
`;

const Infos = styled(FlexWrapper)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const QuestionAsked = ({ question, history }) => {
    const { t } = useTranslation();

    const { categoryItem, tagList, title } = question;

    const subCategoryRender = tagList.length > 0 && (
        <TagsWrapper className="tagcloud">
            <i className="fas fa-tags" />
            {tagList.map(tag => {
                return (
                    <a //eslint-disable-line jsx-a11y/anchor-is-valid
                        key={tag.slug}
                    >
                        {getNameByLanguage(tag)}
                    </a>
                );
            })}
        </TagsWrapper>
    );

    const handleTitle = () => {
        history.push(`/questions/${question.slug}`);
    };

    return (
        <Wrapper>
            <Title onClick={handleTitle}>{title}</Title>
            <ReactMarkdown source={question.body} />
            {subCategoryRender}
            <Infos>
                <span>
                    <InfoTitle>{`${t('common_in')}:`}</InfoTitle>
                    <span>{getNameByLanguage(categoryItem)}</span>
                </span>
                <span>
                    <InfoTitle>{`${t('common_asked')}:`}</InfoTitle>
                    <time dateTime={question.created}>
                        {` ${new Date(question.created).toDateString()}`}
                    </time>
                </span>
            </Infos>
        </Wrapper>
    );
};

export default withRouter(QuestionAsked);
