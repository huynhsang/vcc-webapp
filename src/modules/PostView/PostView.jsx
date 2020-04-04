import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { DefaultWrapper } from '../../component/Wrappers';
import ReactMarkdown from 'react-markdown';

import { postMock, postsMock } from '../PostsPage/mock';
import Tag from '../../component/Tag';
import UserLogo from '../../component/UserLogo';
import isEmpty from 'lodash/isEmpty';
import { Badge } from '../../component/Badge';
import PostRelated from './PostRelated';

import SocialNetwork from '../../component/SocialNetwork';

import {
    FACEBOOK_SHARE_URL,
    TWITTER_SHARE_URL,
    LINKEDIN_SHARE_URL
} from '../../constants/share.constant';

const Wrapper = styled(DefaultWrapper)`
    min-height: calc(100vh - 100px);
    max-width: 900px;
`;

const Title = styled.h2`
    text-align: center;
`;

const Resume = styled.div`
    color: #737373;
`;

const TagsWrapper = styled.div`
    margin-bottom: 10px;
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const UserInfos = styled.div`
    margin-left: 10px;
`;

const UserName = styled.span`
    color: #009fff;
    font-size: 1.1em;
    margin-right: 5px;

    &:hover {
        color: #0570b1;
    }
`;

const CoverImage = styled.img`
    width: 100%;
`;

const Time = styled.time`
    color: #979797;
`;

const InfosWrapper = styled(FlexWrapper)`
    justify-content: space-between;
    margin: 15px 0;
`;

const Background = styled.div`
    background-color: rgba(0, 0, 0, 0.02);
`;

const PostsRelated = styled(FlexWrapper)`
    margin: 0 -10px;
    margin-top: 5px;
    flex-wrap: wrap;
`;

const PageTitle = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const FlexEnd = styled(FlexWrapper)`
    justify-content: flex-end;
`;

const PostView = ({ history }) => {
    const { t } = useTranslation();

    const {
        title,
        body,
        resume,
        coverImage,
        tagList,
        mainCharacter,
        created
    } = postMock;

    const redirect = (url) => (ev) => {
        ev.stopPropagation();
        history.push(url);
    };

    const tagsRender = (tagList || []).map((tag) => (
        <Tag key={tag.id} tag={tag} />
    ));

    const postsRelatedRender = postsMock(3).map((val) => (
        <PostRelated key={val.id} post={val} history={history} />
    ));

    return (
        <>
            <Wrapper>
                <Title>{title}</Title>
                <Resume>{resume}</Resume>
                <InfosWrapper>
                    <FlexWrapper>
                        <UserLogo user={mainCharacter} />
                        <UserInfos>
                            <UserName
                                onClick={redirect(`/users/${mainCharacter.id}`)}
                            >
                                {`${mainCharacter.firstName} ${mainCharacter.lastName}`}
                            </UserName>
                            <Badge points={mainCharacter.points} />
                            <br />
                            <Time dateTime={created}>
                                {` ${new Date(created).toDateString()}`}
                            </Time>
                        </UserInfos>
                    </FlexWrapper>
                    <SocialNetwork
                        isBig
                        fbLink={`${FACEBOOK_SHARE_URL}`}
                        twitterLink={`${TWITTER_SHARE_URL}`}
                        linkedInLink={`${LINKEDIN_SHARE_URL}`}
                    />
                </InfosWrapper>
                {!!coverImage && <CoverImage src={coverImage} alt=" " />}
                <ReactMarkdown source={body} />
                {!isEmpty(tagsRender) && (
                    <TagsWrapper>{tagsRender}</TagsWrapper>
                )}
                <FlexEnd>
                    <SocialNetwork
                        isBig
                        fbLink={`${FACEBOOK_SHARE_URL}`}
                        twitterLink={`${TWITTER_SHARE_URL}`}
                        linkedInLink={`${LINKEDIN_SHARE_URL}`}
                    />
                </FlexEnd>
            </Wrapper>
            <Background>
                <DefaultWrapper>
                    <PageTitle>{t('post_more_from_VCNC')}</PageTitle>
                    <PostsRelated>{postsRelatedRender}</PostsRelated>
                </DefaultWrapper>
            </Background>
        </>
    );
};

export default PostView;
