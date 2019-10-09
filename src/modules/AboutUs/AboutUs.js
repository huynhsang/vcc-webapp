import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import UserInfoList from './UserInfoList';

const Wrapper = styled.div`
    padding-top: 40px;
    color: #4f4f4f;

    width: 95%;
    max-width: 850px;
    margin: 0 auto;
`;
const Title = styled.div`
    font-size: 26px;
    text-align: center;
    font-weight: 600;
`;

const Sologan = styled.div`
    font-size: 18px;
    text-align: center;
    margin: 5px 0 30px;
`;

const SmallTitle = styled.div`
    background-color: #272930;
    color: white;
    padding: 5px;
    border-radius: 5px;
    font-size: 18px;
    text-align: ${p => p.textAlign};
    font-weight: 600;
    margin-top: 25px;

    & .pi {
        font-size: 16px;
    }
`;

const ContentWrapper = styled.div`
    margin-top: 25px;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: ${p => p.alignItem || 'start'};
`;

const ContentTitle = styled.div`
    font-weight: 600;
    border-radius: ${p => p.borderRadius || '0 0 10px 0'};
    font-size: 18px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.2);
    background-color: white;
    padding: 5px 15px;
`;

const Content = styled.div`
    text-align: justify;
    padding: 10px 15px;
`;

const AboutUs = ({}) => {
    const { t } = useTranslation();

    return (
        <Wrapper>
            <Title>{t('about_us_VCNC')}</Title>
            <Sologan>{t('about_us_sologan')}</Sologan>

            <ContentWrapper>
                <ContentTitle>{t('about_us_our_story')}</ContentTitle>
                <Content>{t('about_us_story')}</Content>
            </ContentWrapper>

            <ContentWrapper alignItem="center">
                <ContentTitle borderRadius="0 0 10px 10px">
                    {t('about_us_our_mission')}
                </ContentTitle>
                <Content>{t('about_us_mission')}</Content>
            </ContentWrapper>

            <ContentWrapper>
                <ContentTitle>{t('about_us_what_we_do')}</ContentTitle>
                <Content>{t('about_us_do')}</Content>
            </ContentWrapper>
            <SmallTitle textAlign="center">{t('about_us_our_team')}</SmallTitle>
            <UserInfoList />
        </Wrapper>
    );
};

export default AboutUs;
