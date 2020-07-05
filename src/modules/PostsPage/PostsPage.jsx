import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { DefaultWrapper } from '../../component/Wrappers';
import { PageCover } from '../Header';
import { SearchText } from '../../component/Inputs';
import TagFilter from '../../component/TagFilter';
import Post from './Post';
import { postsMock } from './mock';
import { getIdAndToken } from '../../utils/cookie-tools';
import { ROLES } from '../../constants/constants';

import Button from '@material-ui/core/Button';

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

const useStyles = makeStyles(() => ({
    addButton: {
        margin: '10px 0'
    }
}));

const PostsPage = ({ history }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const postsRender = postsMock(5).map((val) => (
        <Post key={val.id} post={val} />
    ));

    const goToAdd = () => {
        history.push('/posts/add');
    };

    const { role: userRole } = getIdAndToken();
    const isAdmin = ROLES.ADMIN === userRole;

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
                    {isAdmin && (
                        <Button
                            variant="contained"
                            onClick={goToAdd}
                            color="primary"
                            className={classes.addButton}
                        >
                            {t('common_add')}
                        </Button>
                    )}
                    <PostsWrapper>{postsRender}</PostsWrapper>
                </LeftWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};

export default PostsPage;
