import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { DefaultWrapper } from '../../component/Wrappers';
import { PageCover } from '../Header';
import { SearchText } from '../../component/Inputs';
import TagFilter from '../../component/TagFilter';
import Post from './Post';
import { getIdAndToken } from '../../utils/cookie-tools';
import { ROLES } from '../../constants/constants';
import qs from 'qs';

import Button from '@material-ui/core/Button';

import { getPosts } from '../../services/post.service';

const Wrapper = styled.div`
    min-height: calc(100vh - 100px);
`;

const ContentWrapper = styled(DefaultWrapper)``;

const PostsWrapper = styled.div``;

const TagsWrapper = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

const useStyles = makeStyles(() => ({
    addButton: {
        marginBottom: '20px'
    }
}));

const PostsPage = ({ history, location }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const [posts, setPosts] = React.useState([]);

    const filterParse = qs.parse(location.search.substr(1));
    const { tags, text } = filterParse;

    React.useEffect(() => {
        // {
        //     filter: {
        //         where: {
        //             title: text,
        //             tagList: {
        //                 elemMatch: {}
        //             }
        //         }
        //     }
        // }
        getPosts()
            .then((data) => {
                setPosts(data);
            })
            .catch((err) => console.log(err));
    }, [tags, text]);

    const viewPost = (postId) => () => {
        history.push(`/posts/${postId}`);
    };

    const postsRender = posts.map((val) => (
        <Post key={val.id} post={val} viewPost={viewPost(val.id)} />
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
                {/* <TagsWrapper>
                    <TagFilter
                        category={''}
                        tags={''}
                        onChangeFilter={() => {}}
                    />
                </TagsWrapper>
                <SearchText
                    text={''}
                    setText={() => {}}
                    label={t('question_search_question')}
                /> */}
                <PostsWrapper>{postsRender}</PostsWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};

export default PostsPage;
