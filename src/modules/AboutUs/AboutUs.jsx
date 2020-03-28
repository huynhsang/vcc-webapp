import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { PageCover } from '../Header';

import UserInfoList from './UserInfoList';
import { DefaultWrapper } from '../../component/Wrappers';
import backg from './back.svg';

import LogoImage from '../../images/logo.png';
import communicationImage from '../../images/communicationImage.png';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled(DefaultWrapper)`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    ${media.mobileLandscape`
        flex-direction: ${p => p.isResponsiveReserve && 'column-reverse'};
    `}
`;

const Title = styled.div`
    font-size: 1.6rem;
    text-align: center;
    font-weight: 600;
`;

const Sologan = styled.div`
    font-size: 1.2rem;
    text-align: center;
    margin-top: 5px;
`;

const ContentTitle = styled.div`
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 10px;
    ${media.mobileLandscape`
        margin-top: ${p => p.responsiveTop && '10px'};
    `}
`;

const Content = styled.div`
    text-align: justify;
`;

const BottomWrapper = styled.div`
    background-color: #f5f5f5;
    color: #424242;
    padding: 20px;
`;

const Background = styled.div`
    background: url('${backg}');
    background-size: cover;
    padding-top: 50px;
`;

const WidthWrapper = styled.div`
    width: ${p => p.width}%;
    padding: ${p => p.isCenter && '50px 0'};
    ${p=> p.isCenter && `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `}
    ${media.mobileLandscape`
        width: 100%;
        padding: ${p => p.isCenter && '30px 0'};
    `}
`;

const NetworkImg = styled.img`
    max-width: 160px;
    width: 90%;
    ${media.mobileLandscape`
        max-width: 120px;
        margin-top: 15px;
    `}
`;

const CommunicationImg = styled.img`
    max-width: 400px;
    width: 90%;
`;

const Vcnc = styled.div`
    font-size: 1.1rem;
    font-weight: 500;
`;

const AboutUs = () => {
    const { t } = useTranslation();

    return (
        <>
            <PageCover />
            <Wrapper>
                <WidthWrapper width="40">
                    <ContentTitle responsiveTop>
                        {t('about_us_our_story')}
                    </ContentTitle>
                    <Content>{t('about_us_story')}</Content>
                </WidthWrapper>
                <WidthWrapper width="60" isCenter>
                    <NetworkImg src={LogoImage} alt="" />
                    <Vcnc>Vietnamese Counselling and Connecting</Vcnc>
                </WidthWrapper>
            </Wrapper>
            <Background>
                <Wrapper isResponsiveReserve>
                    <WidthWrapper width="45" isCenter>
                        <CommunicationImg src={communicationImage} alt="" />
                    </WidthWrapper>
                    <WidthWrapper width="55">
                        <ContentTitle>{t('about_us_what_we_do')}</ContentTitle>
                        <Content>{t('about_us_do')}</Content>
                    </WidthWrapper>
                </Wrapper>
            </Background>
            <DefaultWrapper>
                <ContentTitle>{t('about_us_our_team')}</ContentTitle>
                <UserInfoList />
            </DefaultWrapper>
            <BottomWrapper>
                <Title>{t('about_us_VCNC')}</Title>
                <Sologan>{t('about_us_sologan')}</Sologan>
            </BottomWrapper>
        </>
    );
};

export default AboutUs;
