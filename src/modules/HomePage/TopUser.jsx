import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import UserLogo from '../../component/UserLogo';
import TruncateMarkup from 'react-truncate-markup';

import { Badge } from '../Badges';
import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled.div`
    width: calc(33.33% - 20px);
    background-color: white;
    padding: 10px;
    margin: 10px;
    user-select: none;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    ${media.tabletLandscape`
        width: calc(50% - 20px);
    `}
    ${media.mobile`
        width: calc(100% - 20px);
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
    margin: 5px 0;
    font-size: 12px;

    & span {
        color: #7f7f7f;
        margin-right: 10px;
    }
`;

const UserName = styled.span`
    color: #009fff;
    margin-right: 10px;
    font-size: 15px;
`;

const DescriptionWrapper = styled.div`
    margin-top: 5px;
    font-size: 15px;
    min-height: 45px;
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
            <TruncateMarkup lines={2}>
                <DescriptionWrapper>{summary}</DescriptionWrapper>
            </TruncateMarkup>
        </Wrapper>
    );
};

export default withRouter(TopUser);
