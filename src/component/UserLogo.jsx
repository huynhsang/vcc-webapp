import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import DefaultUserLogo from '../images/default-user-logo.png';

const LogoWrapper = styled.div`
    width: 42px;
    height: 42px;
    border: 1.5px solid #2d6ff7;
    border-radius: 50%;
    overflow: hidden;
    &:hover {
        border-color: black;
    }
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const UserLogo = ({ user }) => {
    return (
        <Link to={`/users/${user.id}`} onClick={ev => ev.stopPropagation()}>
            <LogoWrapper>
                <Img alt="" src={user.avatar || DefaultUserLogo} />
            </LogoWrapper>
        </Link>
    );
};

export default UserLogo;
