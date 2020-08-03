import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { AVATARS } from '../constants/constants';

import { getBadge } from './Badge/badge.constant';

import { createMediaTemplate } from '../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled.div`
    font-size: 0.8rem;
    cursor: pointer;
`;

const LogoWrapper = styled.div`
    border: 1px dashed ${(p) => p.borderColor};
    border-bottom: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    width: 35px;
    height: 35px;

    ${media.mobileLandscape`
        width: 30px;
        height: 30px;
    `}

    ${media.mobile`
        width: 30px;
        height: 30px;
    `}
`;

const Badge = styled.div`
    background-color: ${(p) => p.backgroundColor};
    color: white;
    padding: 0 3px;
`;

const UserLogo = ({ user, history }) => {
    const { t } = useTranslation();
    const badge = getBadge(user.points);

    const { labelColor, label, level } = badge;

    const onClick = (ev) => {
        ev.stopPropagation();
        history.push(`/users/${user.id}`);
    };

    return (
        <Wrapper borderColor={labelColor} onClick={onClick}>
            <LogoWrapper>
                <Img alt="" src={AVATARS[user.avatarIndex || 0].image} />
            </LogoWrapper>
            <Badge backgroundColor={labelColor}>
                {t(label, level ? { level } : {})}
            </Badge>
        </Wrapper>
    );
};

export default withRouter(UserLogo);
