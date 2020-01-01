import React from 'react';
import styled from 'styled-components';
import {  withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import UserLogo from '../../component/UserLogo';

import { Badge } from '../Badges';

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

const InfosSup = styled.div`
    margin: 5px 0;
    font-size: 12px;

    & span {
        color: #bbbbbb;
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

const DescriptionWrapper = styled.div`
    margin-top: 5px;
    font-size: 15px;
`;

const TopUser = ({ user, history }) => {
    const { t } = useTranslation();

    const {
        id,
        firstName,
        lastName,
        points,
        summary,
        questionCount,
        answerCount
    } = user;

    const redirect = url => ev => {
        ev.stopPropagation();
        history.push(url);
    };

    return (
        <Wrapper onClick={redirect(`/users/${id}`)}>
            <FlexWrapper>
                <UserLogo user={user} />
                <InfosWrapper>
                    <div>
                        <UserName>{`${firstName} ${lastName}`}</UserName>
                        <Badge points={points} />
                    </div>
                    <InfosSup>
                        {questionCount}
                        <span>{` ${t('common_questions')} `}</span>
                        {answerCount}
                        <span>{` ${t('common_answers')} `}</span>
                        {points}
                        <span>{` ${t('common_points')} `}</span>
                    </InfosSup>
                </InfosWrapper>
            </FlexWrapper>
            <DescriptionWrapper>{summary}</DescriptionWrapper>
        </Wrapper>
    );
};

export default withRouter(TopUser);
