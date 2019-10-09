import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 200px;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Image = styled.div`
    width: 100px;
    height: 100px;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: ${p => `url(${p.img})`};
    border-radius:50%;
    background-color:black;
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
