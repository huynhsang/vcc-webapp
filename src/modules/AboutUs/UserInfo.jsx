import React from 'react';
import styled from 'styled-components';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled.div`
    width: 150px;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    ${media.mobileLandscape`
        width: 110px;
        min-width: 110px;
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

const UserInfo = ({ img, name, role }) => {
    return (
        <Wrapper>
            <Image img={img} alt="" />
            <div>{name}</div>
            <div>{role}</div>
        </Wrapper>
    );
};

export default UserInfo;
