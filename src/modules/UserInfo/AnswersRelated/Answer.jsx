import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

const Wrapper = styled.div`
    padding: 5px 10px;
    margin: 10px 0;
    background-color: white;
    width: 90%;
    margin-left: 10%;
    border-radius: 6px 0 0 6px;
`;

const DateWrapper = styled.div`
    text-align: right;
    font-size: 0.9rem;
`;

const DateTitle = styled.span`
    color: #7c7f85;
`;

const Answer = ({ answer }) => {

    const {t} = useTranslation();

    const { created, body } = answer;

    return (
        <Wrapper>
            <div>{body}</div>
            <DateWrapper itemProp="dateCreated">
                <DateTitle>{`${t('user_info_added_an_answer')} `}</DateTitle>
                {new Date(created).toDateString()}
            </DateWrapper>
        </Wrapper>
    );
};

export default Answer;
