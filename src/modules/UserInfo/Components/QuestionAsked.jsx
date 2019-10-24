import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

import { createMediaTemplate } from '../../../utils/css-tools';
const media = createMediaTemplate();

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
    display: flex;
    align-items: center;
`;

const Logo = styled.img`
    width: 60px;
    height: 60px;
    border: 1px solid #2d6ff7;
    border-radius: 50%;
    margin: 0 15px 0 5px;
`;

const Badge = styled.div`
    background-color: #30a96f;
    margin-left: 5px;
`;

const InfoTitle = styled.span`
    color: #7c7f85;
    margin: 0 5px;
`;

const TagsWrapper = styled.div`
    margin-top: 8px;
`;

const Infos = styled(FlexWrapper)`
    ${media.tabletLandscape`flex-direction: column; align-items: start;`}
`;

const QuestionAsked = ({ question }) => {
    const { t } = useTranslation();

    const { askedBy = {}, category = {}, tags, title } = question;

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
            <FlexWrapper>
                <Logo alt="" src={askedBy.avatar} />
                <div>
                    <Infos>
                        <div className="post-author">
                            {`${askedBy.firstName} ${askedBy.lastName}`}
                        </div>
                        <Badge className="badge-span">{askedBy.level}</Badge>
                        <span>
                            <InfoTitle>{`${t('common_asked')}:`}</InfoTitle>
                            <time dateTime={question.createdOn}>
                                {` ${new Date(
                                    question.createdOn
                                ).toDateString()}`}
                            </time>
                        </span>
                        <span>
                            <InfoTitle>{`${t('common_in')}:`}</InfoTitle>
                            <span>{category.nameEn}</span>
                        </span>
                    </Infos>
                    <ReactMarkdown source={question.body} />
                    {subCategoryRender}
                </div>
            </FlexWrapper>
        </Wrapper>
    );
};

export default QuestionAsked;
