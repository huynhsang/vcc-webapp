import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { DefaultWrapper } from '../../component/Wrappers';
import { PageCover } from '../Header';
import { SearchText } from '../../component/Inputs';

import Post from './Post';

import { postsMock } from './mock';

const Wrapper = styled.div`
    min-height: calc(100vh - 100px);
`;

const ContentWrapper = styled(DefaultWrapper)`
    min-height: calc(100vh - 100px);
`;

const PostsWrapper = styled.div``;

const LeftWrapper = styled.div``;

const RightWrapper = styled.div``;

const PostsPage = () => {
    const { t } = useTranslation();

    const postsRender = postsMock.map(val => <Post key={val.key} post={val} />);
    return (
        <Wrapper>
            <PageCover />
            <ContentWrapper>
                <RightWrapper></RightWrapper>
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
