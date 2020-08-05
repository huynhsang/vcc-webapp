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
import Pagination from '../../component/Pagination';

const DEFAULT_LIMIT = 6;

const Wrapper = styled.div`
    min-height: calc(100vh - 100px);
`;

const ContentWrapper = styled(DefaultWrapper)``;

const PostsWrapper = styled.div``;

const TagsWrapper = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

const PaginationWrapper = styled.div`
    margin-top: 10px;
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
    const [postNumber, setPostNumber] = React.useState(0);

    const filterParse = qs.parse(location.search.substr(1));
    const { tags, title, page } = filterParse;

    React.useEffect(() => {
        const pageNumber = page * 1 || 1;
        const filter = {
            where: {},
            skip: (pageNumber - 1) * DEFAULT_LIMIT,
            limit: DEFAULT_LIMIT,
            order: ['modified DESC', 'created DESC'],
        };

        if (title) {
            filter.where.title = { like: `${title}*`, options: 'i' };
        }

        if (tags) {
            const tagIds = tags.split(',');
            filter.where['tagList.slug'] = { in: tagIds };
        }

        getPosts({
            filter
        })
            .then(({ data, count }) => {
                setPosts(data);
                setPostNumber(count);
            })
            .catch((err) => console.log(err));
    }, [tags, title, page]);

    const onChangeFilter = (obj) => {
        const url = `/posts?${qs.stringify({
            title,
            tags,
            ...obj
        })}`;
        history.push(url);
    };

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

    const nbPages = Math.ceil(postNumber / DEFAULT_LIMIT);

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
                <TagsWrapper>
                    <TagFilter
                        category={''}
                        tagsString={tags}
                        tagField="slug"
                        onChange={(val) => onChangeFilter({ tags: val })}
                        usedIn="post"
                    />
                </TagsWrapper>
                <SearchText
                    text={title}
                    setText={(val) => onChangeFilter({ title: val })}
                    label={t('posts_search_post')}
                />
                <PostsWrapper>{postsRender}</PostsWrapper>
                {nbPages > 1 && (
                    <PaginationWrapper>
                        <Pagination
                            nbPages={nbPages}
                            activePage={page}
                            changePage={(newPage) =>
                                onChangeFilter({ page: newPage })
                            }
                            justifyContent="center"
                            color="#37424a"
                        />
                    </PaginationWrapper>
                )}
            </ContentWrapper>
        </Wrapper>
    );
};

export default PostsPage;
