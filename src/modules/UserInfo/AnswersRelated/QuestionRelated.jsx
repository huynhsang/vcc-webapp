import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

import Answer from './Answer';

import { createMediaTemplate } from '../../../utils/css-tools';
import DefaultUserLogo from '../../../images/default-user-logo.png';
import { Badge } from '../../Badges';

import { getNameByLanguage } from '../../../utils/multiple-language';

const media = createMediaTemplate();

const Wrapper = styled.div`
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    overflow: hidden;
    margin: 10px 0;
`;

const QuestionWrapper = styled.div`
    background-color: white;
    padding: 10px;
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

const InfoTitle = styled.span`
    color: #7c7f85;
    margin: 0 5px;
`;

const TagsWrapper = styled.div`
    margin-top: 8px;
`;

const Infos = styled(FlexWrapper)`
    margin-bottom: 10px;
    & .post-author {
        margin-right: 10px;
    }
    ${media.tabletLandscape`flex-direction: column; align-items: start;`}
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: end;
`;

const MoreButton = styled.div`
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: -5px 5px 5px 0;

    height: 35px;
    width: 35px;

    &:hover {
        background-color: #dfdfdf;
    }

    & i {
        font-size: 30px;
    }
`;

const AnswersWrapper = styled.div``;

const QuestionRelated = ({ question }) => {
    const { t } = useTranslation();

    const {
        askedBy,
        categoryItem,
        tagList,
        title,
        answers,
        created
    } = question;

    const tagsRender = tagList.length > 0 && (
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

    const answersRender = (
        <AnswersWrapper>
            {(answers || []).map(answer => (
                <Answer id={answer.id} answer={answer} />
            ))}
        </AnswersWrapper>
    );

    return (
        <Wrapper>
            <QuestionWrapper>
                <Title>{title}</Title>
                <FlexWrapper>
                    <Logo alt="" src={askedBy.avatar || DefaultUserLogo} />
                    <div>
                        <Infos>
                            <div className="post-author">
                                {`${askedBy.firstName} ${askedBy.lastName}`}
                            </div>
                            <Badge points={askedBy.points} />
                            <span>
                                <InfoTitle>{`${t('common_asked')}:`}</InfoTitle>
                                <time dateTime={created}>
                                    {` ${new Date(created).toDateString()}`}
                                </time>
                            </span>
                            <span>
                                <InfoTitle>{`${t('common_in')}:`}</InfoTitle>
                                <span> {getNameByLanguage(categoryItem)}</span>
                            </span>
                        </Infos>
                        <ReactMarkdown source={question.body} />
                        {tagsRender}
                    </div>
                </FlexWrapper>
            </QuestionWrapper>
            {answersRender}
            <ButtonWrapper>
                <MoreButton>
                    <i className="pi pi-ellipsis-h"></i>
                </MoreButton>
            </ButtonWrapper>
        </Wrapper>
    );
};

export default QuestionRelated;
