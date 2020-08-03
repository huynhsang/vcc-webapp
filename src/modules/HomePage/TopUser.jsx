import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import UserLogo from '../../component/UserLogo';
import TruncateMarkup from 'react-truncate-markup';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled.div`
    margin: 10px 0 35px;
    user-select: none;
    cursor: pointer;

    ${media.mobileLandscape`
        margin: 10px 0 25px;
    `}
`;

const InfosWrapper = styled.div`
    margin-left: 10px;
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const InfosSup = styled.div`
    font-size: 0.9rem;

    & span {
        color: #7f7f7f;
        margin-right: 10px;
    }
`;

const UserName = styled.span`
    color: #053d68;
    margin-right: 10px;
`;

const DescriptionWrapper = styled.div`
    margin-top: 5px;
`;

const TopUser = ({ user, history }) => {
    const { t } = useTranslation();

    const { id, username, points, summary, questionCount, answerCount } = user;

    const redirect = (url) => (ev) => {
        ev.stopPropagation();
        history.push(url);
    };

    return (
        <Wrapper onClick={redirect(`/users/${id}`)}>
            <FlexWrapper>
                <UserLogo user={user} />
                <InfosWrapper>
                    <UserName>{username}</UserName>
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
            <TruncateMarkup lines={2}>
                <DescriptionWrapper>{summary}</DescriptionWrapper>
            </TruncateMarkup>
        </Wrapper>
    );
};

export default withRouter(TopUser);
