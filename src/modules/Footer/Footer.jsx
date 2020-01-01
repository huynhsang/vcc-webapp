import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import VCNCLogo from '../../images/VCNC-logo.png';

import FooterMenu from './FooterMenu';
import LanguageSelector from './LanguageSelector';

import LinkedinIcon from '../../images/LinkedinIcon.png';
import FbIcon from '../../images/FbIcon.png';

import { FACEBOOK_URL, LINKEDIN_URL } from '../../constants/links.constant';

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const LogoWrapper = styled(FlexWrapper)`
    flex-direction: column;
    padding: 0 30px 0 10px;
`;

const Block = styled.div`
    padding: 0 10px;
`;

const FooterWrapper = styled.footer`
    background: black;
    color: rgba(255, 255, 255, 0.9);
`;

const ContentWrapper = styled(FlexWrapper)`
    max-width: 1280px;
    margin: 0 auto;
    padding: 10px;
    justify-content: space-between;
`;

const Logo = styled.img`
    height: 40px;
    width: 40px;
`;

const SocialIcon = styled.div`
  margin-right: ${p => p.marginRight};
  background-image: url('${p => p.src}');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  width: 40px;
  height: 40px;
  &:hover{
    transform: scale(1.1) translateZ(0);
  }
`;

const Footer = ({}) => {
    const { t } = useTranslation();

    const openNewTab = link => {
        window.open(link, '_blank');
    };

    return (
        <FooterWrapper>
            <ContentWrapper>
                <FlexWrapper>
                    <LogoWrapper>
                        <Logo src={VCNCLogo} />
                        <div>{t('footer_all_right_reserved')}</div>
                    </LogoWrapper>
                    <FooterMenu />
                </FlexWrapper>
                <Block>
                    <LanguageSelector />
                </Block>
                <Block>
                    <div>{t('common_follow_us')}</div>
                    <FlexWrapper>
                        <SocialIcon
                            src={FbIcon}
                            onClick={() => openNewTab(FACEBOOK_URL)}
                            marginRight="10px"
                        />
                        <SocialIcon
                            src={LinkedinIcon}
                            onClick={() => openNewTab(LINKEDIN_URL)}
                        />
                    </FlexWrapper>
                </Block>
            </ContentWrapper>
        </FooterWrapper>
    );
};

export default Footer;
