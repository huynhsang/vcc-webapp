import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { DefaultWrapper } from '../../component/Wrappers';
import { PageCover } from '../Header';
import { SearchText } from '../../component/Inputs';
import TagFilter from '../../component/TagFilter';
import Post from './Post';
import { postsMock } from './mock';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();


const Wrapper = styled.div`
    min-height: calc(100vh - 100px);
`;

const ContentWrapper = styled(DefaultWrapper)`
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
`;

const PostsWrapper = styled.div``;

const LeftWrapper = styled.div`
    width: 75%;
    padding-right: 20px;

    ${media.mobileLandscape`
        width: 100%;
        padding: 0;
        margin-top: 10px;
    `}
`;

const RightWrapper = styled.div`
    width: 25%;

    ${media.mobileLandscape`
        width: 100%;
        min-height: 0;
        margin-top: 15px;
    `}
`;

const PostsPage = () => {
    const { t } = useTranslation();

    const postsRender = postsMock(5).map((val) => (
        <Post key={val.id} post={val} />
    ));
    return (
        <Wrapper>
            <PageCover />
            <ContentWrapper>
                <RightWrapper>
                    <TagFilter
                        category={''}
                        tags={''}
                        onChangeFilter={() => {}}
                    />
                </RightWrapper>
                <LeftWrapper>
                    <SearchText
                        text={''}
                        setText={() => {}}
                        label={t('question_search_question')}
                    />
                    <PostsWrapper>{postsRender}</PostsWrapper>
                </LeftWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};

export default PostsPage;
