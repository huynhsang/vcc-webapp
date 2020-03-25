import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import DefaultUserLogo from '../images/default-user-logo.png';

const LogoWrapper = styled.div`
    width: 42px;
    height: 42px;
    border: 1px solid black;
    border-radius: 50%;
    overflow: hidden;
    padding: 1px;
    &:hover {
        border-color: black;
    }
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
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
