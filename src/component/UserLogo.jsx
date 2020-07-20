import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AVATARS } from '../constants/constants';

import { createMediaTemplate } from '../utils/css-tools';
const media = createMediaTemplate();

const LogoWrapper = styled.div`
    width: 35px;
    height: 35px;
    border: 1px solid #cbcbcb;
    border-radius: 50%;
    overflow: hidden;
    padding: 1px;
    &:hover {
        transform: scale(1.1) translateZ(0);
    }

    display: flex;
    justify-content: center;
    align-items: center;

    ${media.mobileLandscape`
        width: 30px;
        height: 30px;
    `}

    ${media.mobile`
        width: 30px;
        height: 30px;
    `}
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
`;

const UserLogo = ({ user }) => {
    return (
        <Link to={`/users/${user.id}`} onClick={(ev) => ev.stopPropagation()}>
            <LogoWrapper>
                <Img alt="" src={AVATARS[user.avatarIndex || 0].image} />
            </LogoWrapper>
        </Link>
    );
};

export default UserLogo;
