import React from 'react';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { DefaultWrapper } from '../../component/Wrappers';
import ReactMarkdown from 'react-markdown';
import Button from '@material-ui/core/Button';
import isEmpty from 'lodash/isEmpty';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import SocialNetwork from '../../component/SocialNetwork';

import {
    FACEBOOK_SHARE_URL,
    TWITTER_SHARE_URL,
    LINKEDIN_SHARE_URL
} from '../../constants/share.constant';

import { getPost } from '../../services/post.service';

const useStyles = makeStyles(() => ({
    linkButton: {
        color: 'rgba(0, 0, 0, 0.58)',
        marginBottom: 10
    },
}));

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

const UserName = styled.div`
    color: #009fff;
    font-size: 1.1em;
    margin-right: 5px;

    /* &:hover {
        color: #0570b1;
    } */
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

// const Background = styled.div`
//     background-color: rgba(0, 0, 0, 0.02);
// `;

// const PostsRelated = styled(FlexWrapper)`
//     margin: 0 -10px;
//     margin-top: 5px;
//     flex-wrap: wrap;
// `;

// const PageTitle = styled.div`
//     font-size: 1.2rem;
//     font-weight: bold;
//     padding-bottom: 5px;
//     margin-bottom: 10px;
//     border-bottom: 1px solid rgba(0, 0, 0, 0.1);
// `;

const FlexEnd = styled(FlexWrapper)`
    justify-content: flex-end;
`;

const CharacterInfos = styled.div``;

const PostView = ({ history, match }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const [post, setPost] = React.useState(null);

    const postId = match && match.params && match.params.postId;

    React.useEffect(() => {
        getPost(postId)
            .then((data) => setPost(data))
            .catch((err) => console.error(err));
    }, [postId]);

    const characterNames = React.useMemo(() => {
        if (!post || !post.characterList) {
            return null;
        }
        return post.characterList
            .map(({ lastName, firstName, experiences = [] }) => {
                let experience;

                experiences.forEach((val, key) => {
                    if (key === 0 || val.isWorking) {
                        experience = val;
                    } else if (
                        new Date(val.startDate).getTime() <
                        new Date(experience).getTime()
                    ) {
                        experience = val;
                    }
                });

                return `${lastName} ${firstName} ${
                    experience ? `(${experience.company})` : ''
                }`;
            })
            .join(', ');
    }, [post]);

    if (!post) {
        return <div />;
    }

    const { title, resume, imageList, created, tagList, body } = post;

    // const redirect = (url) => (ev) => {
    //     ev.stopPropagation();
    //     history.push(url);
    // };

    const tagsRender = tagList
        .map((val) =>
            val ? val[i18n.language === 'vi' ? 'nameVi' : 'nameEn'] : ''
        )
        .join(', ');

    // const postsRelatedRender = postsMock(3).map((val) => (
    //     <PostRelated key={val.id} post={val} history={history} />
    // ));

    const coverImage = (imageList || [])[0];
    const imageUrl = coverImage ? coverImage.lrg : '';

    return (
        <>
            <Wrapper>
                <Title>{title}</Title>
                <Resume>{resume}</Resume>
                <InfosWrapper>
                    <CharacterInfos>
                        <UserName>{characterNames}</UserName>
                        <Time dateTime={created}>
                            {` ${new Date(created).toDateString()}`}
                        </Time>
                    </CharacterInfos>
                    <SocialNetwork
                        isBig
                        fbLink={`${FACEBOOK_SHARE_URL}`}
                        twitterLink={`${TWITTER_SHARE_URL}`}
                        linkedInLink={`${LINKEDIN_SHARE_URL}`}
                    />
                </InfosWrapper>
                {!!imageUrl && <CoverImage src={imageUrl} alt=" " />}
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
                <Button
                    onClick={() => history.goBack()}
                    className={classes.linkButton}
                    startIcon={<ChevronLeftIcon />}
                >
                    {t('common_come_back')}
                </Button>
            </Wrapper>
            {/* <Background>
                <DefaultWrapper>
                    <PageTitle>{t('post_more_from_VCNC')}</PageTitle>
                    <PostsRelated>{postsRelatedRender}</PostsRelated>
                </DefaultWrapper>
            </Background> */}
        </>
    );
};

export default PostView;
