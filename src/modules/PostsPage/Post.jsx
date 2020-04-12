import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import VCNCLogo from '../../images/VCNC-logo.png';
import UserLogo from '../../component/UserLogo';

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 5px;
`;

const Wrapper = styled.div`
    display: flex;
    padding: 10px 0;
    justify-content: space-between;
`;

const ContentWrapper = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    min-height: 0;
    padding-right: 10px;
`;

const ImgCover = styled.div`
    background-position: center;
    background-color: black;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url('${(p) => p.img}');
    width: 150px;
    border: 2px solid black;
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 1.1em;
    margin-bottom: 5px;
`;

const Resume = styled.div`
    color: #636363;
`;

const MainCharacter = styled.div``;

const Time = styled.time`
    color: #979797;
`;

const Infos = styled.div`
    margin-left: 10px;
`;

const Post = ({ post }) => {
    const { t } = useTranslation();

    const {
        title,
        resume,
        coverImage,
        mainCharacter: { firstName, lastName, company },
        created
    } = post;

    const characterName = `${lastName} ${firstName} ${
        company ? `${t('common_in')} ${company}` : ''
    }`;

    return (
        <Wrapper>
            <ContentWrapper>
                <Title>{title}</Title>
                <Resume>{resume}</Resume>
                <FlexWrapper>
                    <UserLogo user={{ avatar: '' }} />
                    <Infos>
                        <MainCharacter>{characterName}</MainCharacter>
                        <Time dateTime={created}>
                            {` ${new Date(created).toDateString()}`}
                        </Time>
                    </Infos>
                </FlexWrapper>
            </ContentWrapper>
            <ImgCover img={coverImage || VCNCLogo} alt="" />
        </Wrapper>
    );
};

export default Post;
