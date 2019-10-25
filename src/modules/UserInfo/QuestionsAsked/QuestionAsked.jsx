import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

const Wrapper = styled.div`
    background-color: white;
    padding: 10px;
    margin: 10px 0;
    border-radius: 2px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
`;

const FlexWrapper = styled.div`

`;

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

const QuestionAsked = ({ question }) => {
    const { t } = useTranslation();

    const { category = {}, tags, title } = question;

    const subCategories = tags ? JSON.parse(tags) : [];

    const subCategoryRender = subCategories.length > 0 && (
        <TagsWrapper className="tagcloud">
            <i className="fas fa-tags" />
            {subCategories.map((subCategory, count) => {
                return (
                    <a //eslint-disable-line jsx-a11y/anchor-is-valid
                        key={count}
                    >
                        {subCategory.nameEn}
                    </a>
                );
            })}
        </TagsWrapper>
    );

    return (
        <Wrapper>
            <Title>{title}</Title>
            <ReactMarkdown source={question.body} />
            {subCategoryRender}
                <Infos>
                    <span>
                        <InfoTitle>{`${t('common_in')}:`}</InfoTitle>
                        <span>{category.nameEn}</span>
                    </span>
                    <span>
                        <InfoTitle>{`${t('common_asked')}:`}</InfoTitle>
                        <time dateTime={question.createdOn}>
                            {` ${new Date(question.createdOn).toDateString()}`}
                        </time>
                    </span>
                </Infos>
        </Wrapper>
    );
};

export default QuestionAsked;
