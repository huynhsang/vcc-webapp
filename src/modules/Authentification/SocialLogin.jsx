import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import Facebook from '@material-ui/icons/Facebook';
import Mail from '@material-ui/icons/Mail';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const { REACT_APP_SOCIAL_LOGIN_API_URL } = process.env;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 20px;
    ${media.mobileLandscape`
        margin-bottom: 10px;
    `}
`;

const iconCss = css`
    opacity: 0.4;
    margin: 5px;
    cursor: pointer;
    &:hover {
        opacity: 0.9;
    }
    ${media.mobileLandscape`
        margin: 0px;
    `}
`;

const FacebookIcon = styled(Facebook)`
    ${iconCss};
    font-size: 84px !important;
    ${media.mobileLandscape`
        font-size: 65px !important;
    `}
`;

const MailIcon = styled(Mail)`
    ${iconCss};
    font-size: 90px !important;
    ${media.mobileLandscape`
        font-size: 72px !important;
    `}
`;

const OrWord = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(50%);
    background-color: white;
    padding: 0 5px;
    color: rgba(0, 0, 0, 0.5);
`;

const SocialLogin = () => {
    const { t } = useTranslation();
    const onAuth = type => () => {
        window.location = `${REACT_APP_SOCIAL_LOGIN_API_URL}/auth/${type}`;
    };

    return (
        <Wrapper>
            <FlexWrapper>
                <FacebookIcon onClick={onAuth('facebook')} />
                <MailIcon onClick={onAuth('google')} />
            </FlexWrapper>
            <OrWord>{t('common_or')}</OrWord>
        </Wrapper>
    );
};

export default SocialLogin;
