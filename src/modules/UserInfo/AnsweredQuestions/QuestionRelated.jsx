import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';

import Answer from './Answer';

import { createMediaTemplate } from '../../../utils/css-tools';
import { getNameByLanguage } from '../../../utils/multiple-language';
import Tag from '../../../component/Tag';
import { RowWrapper } from '../../../component/Wrappers';
import LabelIcon from '@material-ui/icons/Label';

const Wrapper = styled.div`
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    overflow: hidden;
    margin: 10px 0;
    padding: 10px;
`;

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
    cursor: pointer;
`;

const AnswersWrapper = styled.div``;

const CategoryWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 5px;
    font-size: 0.9rem;
    font-weight: 600;

    & svg {
        margin-right: 5px;
        color: #616161;
    }
`;

const AnswerNumber = styled.div`
    text-align: right;
    & span {
        color: red;
    }
`;

const QuestionRelated = ({ question, location, history }) => {
    const { categoryItem, tagList, title, body, slug, answers } = question;

    const handleTitle = () => {
        history.push(`/questions/${slug}`);
    };

    const tagsRender = tagList.length > 0 && (
        <RowWrapper>
            {tagList.map((tag) => (
                <Tag key={tag.id} tag={tag} />
            ))}
        </RowWrapper>
    );

    const userId = location.pathname.split('/')[2];

    const answersRender = (answers || [])
        .filter((answer) => answer.ownerId === userId)
        .map((answer) => (
            <Answer id={answer.id} answer={answer} key={answer.id} />
        ));

    return (
        <Wrapper>
            <Title onClick={handleTitle}>{title}</Title>
            <ReactMarkdown source={body} />
            <CategoryWrapper>
                <LabelIcon />
                {getNameByLanguage(categoryItem)}
            </CategoryWrapper>
            {tagsRender}
            <AnswerNumber>
                <span>{answersRender.length}</span> answers
            </AnswerNumber>
            <AnswersWrapper>{answersRender}</AnswersWrapper>
        </Wrapper>
    );
};

export default withRouter(QuestionRelated);
