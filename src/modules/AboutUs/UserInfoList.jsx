import React from 'react';
import styled from 'styled-components';

import { team } from './VCNC-team.constant';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;
`;

const UserInfo = styled.div`
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 20px;
    ${media.mobileLandscape`
        width: 110px;
        margin: 10px;
    `}
    ${media.mobile`
        margin: 10px 0;
    `}
`;

const Image = styled.div`
    width: 100px;
    height: 100px;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: ${p => `url(${p.img})`};
    border-radius: 50%;
    background-color: black;
`;

const UserInfoList = () => {
    const userInfos = team.map(({ name, img, role }) => (
        <UserInfo key={name}>
            <Image img={img} alt="" />
            <div>{name}</div>
            <div>{role}</div>
        </UserInfo>
    ));

    return <Wrapper>{userInfos}</Wrapper>;
};

export default UserInfoList;
