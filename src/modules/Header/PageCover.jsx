import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { setToRegistreFn } from '../../actions/app';

import Cover from '../../images/cover.png';

import { REGISTRE_MENTOR_FORM_LINK } from '../ContactUs';

import { DefaultWrapper } from '../../component/Wrappers';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const CoverWrapper = styled.section`
    background-image: url('${Cover}');
    filter: progid: DXImageTransform.Microsoft.AlphaImageLoader(src='${Cover}', sizingMethod="scale");
    -ms-filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${Cover}',sizingMethod='scale')";
    background-color: black;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center right;

    width : 100%;
    height: 250px;
    position: relative;
    color: white;

    ${media.mobile`
        height: 320px;
    `}
`;

const Glass = styled.div`
    position: absolute;
    background: #0000006b;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

const ContentWrapper = styled(DefaultWrapper)`
    position: relative;
    display: flex;
    height: 100%;
    align-items: center;
`;

const LeftContent = styled.div`
    width: 70%;
    ${media.mobileLandscape`
        width: 90%;
    `}
`;

const AskWrapper = styled.div`
    font-size: 17px;
    line-height: 30px;
    margin-bottom: 10px;
    color: white;

    & a {
        color: #ffff00cc;
        border-bottom: 1px solid;
        margin-left: 10px;
        user-select: none;
        white-space: nowrap;

        &:hover {
            color: yellow;
        }
    }
`;

const FindOut = styled.div`
    position: relative;
    margin: 20px 0 0 20px;
    font-size: 17px;
    border: 1px solid #ffff00cc;
    width: 200px;
    height: 30px;
    & a {
        position: absolute;
        background-color: #dede00;
        color: black;
        bottom: 8px;
        left: 8px;
        height: 30px;
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        cursor: pointer;
        text-decoration: none;
    }
`;

const PageCover = () => {
    const { t } = useTranslation();

    return (
        <CoverWrapper>
            <Glass />
            <ContentWrapper>
                <LeftContent>
                    <AskWrapper>
                        {t('home_ask_verified_professionals')}
                        <Link to="/add-question">
                            {`+ ${t('home_ask_a_question')}`}
                        </Link>
                    </AskWrapper>
                    <p>{t('home_want_to_get')}</p>
                    <FindOut>
                        <a
                            href={REGISTRE_MENTOR_FORM_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t('home_find_out_how')}
                        </a>
                    </FindOut>
                </LeftContent>
            </ContentWrapper>
        </CoverWrapper>
    );
};

const mapStateToProps = ({ App: { isAuthenticated } }) => ({
    isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    setToRegistre: () => dispatch(setToRegistreFn())
});

export default connect(mapStateToProps, mapDispatchToProps)(PageCover);
