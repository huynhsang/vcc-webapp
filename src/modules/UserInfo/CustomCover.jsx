import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Cover from '../../images/cover.png';
import { DefaultWrapper } from '../../component/Wrappers';
import AskButton from '../../component/AskButton';
import DefaultUserLogo from '../../images/default-user-logo.png';
import { Badge } from '../../component/Badge';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const CoverWrapper = styled.section`
    background-image: url('${Cover}');
    background-color: black;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center right;

    width : 100%;
    min-height: 220px;
    position: relative;
    color: white;

    display: flex;
    align-items: center;
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

    ${media.mobileLandscape`
        flex-direction: column;
        align-items: center;
    `}
`;

const CenterContent = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    margin-left: 15px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${media.mobileLandscape`
        margin-left: 0;
        margin-top: 10px;
        width: 100%;
        text-align: center;
    `}
`;

const UserImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
`;

const SummaryWrapper = styled.div`
    width: 100%;
    color: white;
    border-radius: 2px;
    padding: 10px;
    margin-top: 10px;
    text-align: left;
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
    width: 100%;
    margin-top: 10px;
    ${media.mobileLandscape`
        align-items: center;
    `}
`;

const UserName = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const CustomCover = ({ userProfile, isCurrentUser = false }) => {
    const { t } = useTranslation();

    const { firstName, lastName, avatar, points, summary, id } = userProfile;

    return (
        <CoverWrapper>
            <Glass />
            <ContentWrapper>
                <UserImage src={avatar || DefaultUserLogo} alt="" />
                <CenterContent>
                    <div>
                        <UserName>{`${lastName} ${firstName}`}</UserName>
                        <Badge points={points} />
                    </div>
                    {Boolean(summary) && (
                        <SummaryWrapper>
                            <SignWrapper>“</SignWrapper>
                            <p>{summary}</p>
                            <SignWrapper textAlign="right">”</SignWrapper>
                        </SummaryWrapper>
                    )}
                    {!isCurrentUser && (
                        <AlginRight>
                            <AskButton
                                label={t('common_ask')}
                                toLink={`/add-question?userAsked=${id}`}
                            />
                        </AlginRight>
                    )}
                </CenterContent>
            </ContentWrapper>
        </CoverWrapper>
    );
};

export default CustomCover;
