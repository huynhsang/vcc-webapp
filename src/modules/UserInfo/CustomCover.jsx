import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { setToRegistreFn } from '../../actions/app';

import Cover from '../../images/cover.png';

import { REGISTRE_MENTOR_FORM_LINK } from '../ContactUs';

import { DefaultWrapper } from '../../component/Wrappers';
import DefaultUserLogo from '../../images/default-user-logo.png';
import { Badge } from '../Badges';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const CoverWrapper = styled.section`
    background-image: url('${Cover}');
    /* filter: progid: DXImageTransform.Microsoft.AlphaImageLoader(src='${Cover}', sizingMethod="scale");
    -ms-filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${Cover}',sizingMethod='scale')"; */
    background-color: black;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center right;

    width : 100%;
    min-height: 220px;
    position: relative;
    color: white;
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
    padding: 10px 20px;
    position: relative;
    display: flex;
    height: 100%;
    align-items: center;
    ${media.mobileLandscape`
        flex-direction: column;
    `}
`;

const LeftContent = styled.div`
    margin-left: 15px;
    margin-top: 15px;
`;

const AskWrapper = styled.div`
    font-size: 14px;
    line-height: 30px;
    color: white;
    width: 70%;
    text-align: right;

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

    ${media.mobileLandscape`
        text-align: center;
    `}

    ${media.tabletLandscape`
        width: 100%;
    `}
`;

const FindOut = styled.div`
    position: relative;
    margin: 20px 0 0 20px;
    font-size: 17px;
    border: 1px solid #ffff00cc;
    width: 200px;
    height: 30px;
    & a {
        font-size: 16px;
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
    }
`;

const UserImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-top: 10px;
`;

const CenterWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const SummaryWrapper = styled.div`
    color: white;
    border-radius: 2px;
    padding: 10px;
    margin-bottom: 10px;
    & p {
        margin: 0 20px;
        text-align: justify;
    }
`;

const SignWrapper = styled.div`
    text-align: ${p => p.textAlign};
    font-size: 40px;
`;

const AlginRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    ${media.mobileLandscape`
        align-items: center;
    `}
`;

const CustomCover = ({ userProfile }) => {
    const { t } = useTranslation();

    const { firstName, lastName, avatar, points, summary } = userProfile;

    return (
        <CoverWrapper>
            <Glass />
            <ContentWrapper>
                <CenterWrapper>
                    <UserImage src={avatar || DefaultUserLogo} alt="" />
                    <div>{`${lastName} ${firstName}`}</div>
                    <Badge points={points} />
                </CenterWrapper>
                <LeftContent>
                    {Boolean(summary) && (
                        <SummaryWrapper>
                            <SignWrapper>“</SignWrapper>
                            <p>{summary}</p>
                            <SignWrapper textAlign="right">”</SignWrapper>
                        </SummaryWrapper>
                    )}
                    <AlginRight>
                        <AskWrapper>
                            {t('home_ask_verified_professionals')}
                            <Link to="/add-question">
                                {`+ ${t('home_ask_a_question')}`}
                            </Link>
                        </AskWrapper>
                        <FindOut>
                            <a
                                href={REGISTRE_MENTOR_FORM_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t('home_find_out_how')}
                            </a>
                        </FindOut>
                    </AlginRight>
                </LeftContent>
            </ContentWrapper>
        </CoverWrapper>
    );
};

export default CustomCover;
