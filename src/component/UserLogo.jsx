import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import DefaultUserLogo from '../images/default-user-logo.png';
import FaceIcon from '@material-ui/icons/Face';

import { createMediaTemplate } from '../utils/css-tools';
const media = createMediaTemplate();

const LogoWrapper = styled.div`
    width: 35px;
    height: 35px;
    border: 1px solid black;
    border-radius: 50%;
    overflow: hidden;
    padding: 1px;
    &:hover {
        transform: scale(1.1) translateZ(0);
    }

    display: flex;
    justify-content: center;
    align-items: center;

    & svg {
        font-size: 30px;
        color: black;
    }

    ${media.mobileLandscape`
        width: 30px;
        height: 30px;
        & svg{
            font-size: 26px;
        }
    `}

    ${media.mobile`
        width: 30px;
        height: 30px;
        & svg{
            font-size: 26px;
        }
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
                {user.avatar ? (
                    <Img alt="" src={user.avatar || DefaultUserLogo} />
                ) : (
                    <FaceIcon />
                )}
            </LogoWrapper>
        </Link>
    );
};

export default UserLogo;
