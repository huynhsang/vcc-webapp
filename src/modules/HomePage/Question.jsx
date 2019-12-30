import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

import UserLogo from '../../component/UserLogo';

import isEmpty from 'lodash/isEmpty';

import { getNameByLanguage } from '../../utils/multiple-language';

import { Badge } from '../Badges';

import Tag from '../../component/Tag';

const Wrapper = styled.div`
    width: calc(33.33% - 20px);
    float: left;
    background-color: white;
    padding: 10px;
    margin: 10px;
    user-select: none;
    cursor: pointer;
`;

const InfosWrapper = styled.div`
    margin-left: 10px;
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 17px;
    margin-bottom: 10px;
`;

const InfosSup = styled.div`
    margin: 5px 0;
    font-size: 12px;

    & span {
        color: #bbbbbb;
    }

    & time {
        margin-right: 10px;
    }
`;

const UserName = styled.span`
    color: #009fff;
    margin-right: 10px;
    font-size: 15px;

    &:hover {
        color: #0570b1;
    }
`;

const BottomWrapper = styled(FlexWrapper)`
    justify-content: flex-end;
    width: 100%;

    & i {
        margin-right: 5px;
        margin-left: 15px;
    }
`;

const DescriptionWrapper = styled.div`
    margin-top: 5px;
    font-size: 15px;
`;

const Question = ({ question, history }) => {
    const { t } = useTranslation();

    const {
        askedBy = {},
        body,
        categoryItem,
        bestAnswerItem,
        created,
        answerCount,
        viewCount,
        slug,
        tagList
    } = question;

    const tagsRender = (tagList || []).map(tag => (
        <Tag key={tag.id} tag={tag} />
    ));

    const redirect = url => (ev) => {
        ev.stopPropagation();
        history.push(url);
    };

    return (
        <Wrapper onClick={redirect(`/homes/question/${slug}/view`)}>
            <Title>{question.title}</Title>
            <FlexWrapper>
                <UserLogo user={askedBy} />
                <InfosWrapper>
                    <div>
                        <UserName
                            onClick={redirect(`/users/${askedBy.id}`)}
                        >
                            {`${askedBy.firstName} ${askedBy.lastName}`}
                        </UserName>
                        <Badge points={askedBy.points} />
                    </div>
                    <InfosSup>
                        <span>{`${t('common_asked')}: `}</span>
                        <time dateTime={created}>
                            {` ${new Date(created).toDateString()}`}
                        </time>
                        <span>{`${t('common_in')}: `}</span>
                        {getNameByLanguage(categoryItem)}
                    </InfosSup>
                </InfosWrapper>
            </FlexWrapper>
            <DescriptionWrapper>
                <ReactMarkdown source={body} />
            </DescriptionWrapper>
            {!isEmpty(tagsRender) && <div className="row">{tagsRender}</div>}
            <BottomWrapper>
                <i className="icon-comment" />
                <span>{`${answerCount} ${t('common_answer')}`}</span>
                <i className="icon-eye" />
                <span>{`${viewCount} ${t('common_views')}`}</span>
            </BottomWrapper>
        </Wrapper>
    );
};

export default withRouter(Question);
