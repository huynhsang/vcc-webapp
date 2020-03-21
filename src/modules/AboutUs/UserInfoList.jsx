import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { team } from './VCNC-team.constant';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: 10px -20px 0;
`;

const UserInfo = styled.div`
    width: calc(33% - 40px);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    text-align: center;
    color: #3c3c3c;
    ${media.mobileLandscape`
        width: calc(50% - 40px);
    `}
`;

const Image = styled.div`
    width: 100%;
    height: 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: ${p => `url(${p.img})`};
    border-radius: 50%;
    background-color: black;
`;

const Thumbnail = styled.div`
    width: 100%;
    height: calc(50vw - 45px);
    max-width: 200px;
    max-height: 200px;
    border-radius: 50%;
    border: 1px solid #3c3c3c;
    padding: 5px;
    ${media.mobile`
        padding: 3px;
    `}
`;

const Name = styled.div`
    font-size: 17px;
    font-weight: 600;
    margin-top: 10px;
`;

const UserInfoList = () => {
    const { t } = useTranslation();

    const userInfos = team.map(({ name, img, role, experience, gmail }) => (
        <UserInfo key={name}>
            <Thumbnail>
                <Image img={img} alt="" />
            </Thumbnail>
            <Name>{name}</Name>
            <div>{t(role)}</div>
            <div>{t(experience)}</div>
            <div>{`${t('common_contact')}: ${gmail}`}</div>
        </UserInfo>
    ));

    return <Wrapper>{userInfos}</Wrapper>;
};

export default UserInfoList;
