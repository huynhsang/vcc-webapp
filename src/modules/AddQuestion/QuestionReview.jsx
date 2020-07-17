import React from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import Tag from '../../component/Tag';
import { getNameByLanguage } from '../../utils/multiple-language';
import LabelIcon from '@material-ui/icons/Label';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const Wrapper = styled.div`
    & svg {
        font-size: 16px;
        margin-right: 5px;
    }
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const TagsWrapper = styled.div`
    margin-bottom: 10px;
`;

const ContentBox = styled.div`
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    padding: 10px;
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 1.1rem;
`;

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

const AskTo = styled.div`
    color: #7f7f7f;
`;

const UserAsked = styled.div`
    padding: 0 5px;
`;

const QuestionReview = ({
    title,
    body,
    tags,
    category,
    supporters,
    isPublic
}) => {
    const { t } = useTranslation();

    const tagsRender = (tags || []).map((tag) => (
        <Tag key={tag.id} tag={tag} />
    ));

    const userAskedList = (supporters || []).map((val) => (
        <UserAsked key={val.id}>{val.username}</UserAsked>
    ));

    return (
        <Wrapper>
            <h3>{t('question_review_question')}</h3>
            <h4>{t('question_let_one_more_look')}</h4>
            <ContentBox>
                <Title>{title}</Title>
                <ReactMarkdown source={body} />
                <CategoryWrapper>
                    <LabelIcon />
                    {getNameByLanguage(category)}
                </CategoryWrapper>
                {!isEmpty(tagsRender) && (
                    <TagsWrapper>{tagsRender}</TagsWrapper>
                )}
                {!isEmpty(supporters) && (
                    <FlexWrapper>
                        <AskTo>{t('common_ask_to')}:</AskTo>
                        {userAskedList}
                    </FlexWrapper>
                )}
            </ContentBox>
            <FlexWrapper>
                {isPublic ? <LockOpenIcon /> : <LockIcon />}
                <p>{t(isPublic ? 'question_public' : 'question_private')}</p>
            </FlexWrapper>
        </Wrapper>
    );
};

export default QuestionReview;
