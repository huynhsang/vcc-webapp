import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';

import Answer from './Answer';

import { createMediaTemplate } from '../../../utils/css-tools';
import DefaultUserLogo from '../../../images/default-user-logo.png';
import { Badge } from '../../../component/Badge';

import { getNameByLanguage } from '../../../utils/multiple-language';
import Tag from '../../../component/Tag';
import { RowWrapper } from '../../../component/Wrappers';

const media = createMediaTemplate();

const Wrapper = styled.div`
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    overflow: hidden;
    margin: 10px 0;
`;

const QuestionWrapper = styled.div`
    background-color: white;
    padding: 10px;
`;

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
    cursor: pointer;
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

const Infos = styled(FlexWrapper)`
    margin-bottom: 10px;
    & .post-author {
        margin-right: 10px;
    }
    ${media.tabletLandscape`flex-direction: column; align-items: start;`}
`;

const AnswersWrapper = styled.div``;

const QuestionRelated = ({ question, location, history }) => {
    const { t } = useTranslation();

    const {
        askedBy,
        categoryItem,
        tagList,
        title,
        created,
        body,
        slug,
        answers
    } = question;

    const handleTitle = () => {
        history.push(`/questions/${slug}`);
    };

    const tagsRender = tagList.length > 0 && (
        <RowWrapper>
            {tagList.map(tag => (
                <Tag key={tag.id} tag={tag} />
            ))}
        </RowWrapper>
    );

    const userId = location.pathname.split('/')[2];

    const answersRender = (
        <AnswersWrapper>
            {(answers || [])
                .filter(answer => answer.ownerId === userId)
                .map(answer => (
                    <Answer id={answer.id} answer={answer} key={answer.id} />
                ))}
        </AnswersWrapper>
    );

    return (
        <Wrapper>
            <QuestionWrapper>
                <Title onClick={handleTitle}>{title}</Title>
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
                        <ReactMarkdown source={body} />
                        {tagsRender}
                    </div>
                </FlexWrapper>
            </QuestionWrapper>
            {answersRender}
            {/* <ButtonWrapper>
                <MoreButton onClick={getQuestionDetail}>
                    <i className="pi pi-ellipsis-h"></i>
                </MoreButton>
            </ButtonWrapper> */}
        </Wrapper>
    );
};

export default withRouter(QuestionRelated);
