import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { DefaultWrapper } from '../../component/Wrappers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SimpleMDEReact from 'react-simplemde-editor';
import { getCategories } from '../../services/category.service';
import { getUsers } from '../../services/user.service';
import { getNameByLanguage } from '../../utils/multiple-language';
import { tagStyle } from '../../component/Tag';
import { getTagsRelatingCategory } from '../../services/tags.service';
import isEmpty from 'lodash/isEmpty';

import { createPost } from '../../services/post.service';

const useStyles = makeStyles(() => ({
    ...tagStyle,
    marginBottom: {
        marginBottom: '10px'
    }
}));

const Wrapper = styled(DefaultWrapper)`
    min-height: calc(100vh - 100px);
`;

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 15px;
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;

    & img {
        margin: 10px 0;
        max-width: 200px;
        max-height: 200px;
        object-fit: contain;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const TagsWrapper = styled.div`
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 3px;
    min-height: 70px;
    padding: 15px 10px 5px;
    margin: 5px 0 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const TagLabel = styled.div`
    display: inline-block;
    margin: 0 15px 10px 0;
`;

const CategoriesWrapper = styled.div`
    position: absolute;
    top: -8px;
    left: 5px;
    background-color: white;
    display: flex;
`;

const Category = styled.div`
    padding: 0 5px;
    line-height: 16px;
    cursor: ${(p) => !p.isActive && 'pointer'};
    font-weight: ${(p) => p.isActive && '600'};

    &::after {
        display: ${(p) => !p.hasBorder && 'none'};
        content: '-';
        padding-left: 10px;
        font-weight: 300;
    }
`;

const AddPost = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    const [categories, setCategories] = React.useState(null);
    const [activeCatSlug, setActiveCatSlug] = React.useState(null);
    const [tags, setTags] = React.useState([]);
    const [users, setUsers] = React.useState([]);

    // Fetch tags
    React.useEffect(() => {
        getCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => console.log(err.message));

        getUsers()
            .then((data) => {
                setUsers(data || []);
            })
            .catch((err) => console.log(err.response.data.error.message));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (!isEmpty(categories)) {
            setActiveCatSlug(categories[0].slug);
        }
    }, [categories]);

    const [post, setPost] = React.useState({
        title: '',
        coverImage: '',
        resume: '',
        tagIds: [],
        characterIds: [],
        body: ''
    });

    const updatePost = (obj) => setPost((state) => ({ ...state, ...obj }));

    // Fetch tags
    React.useEffect(() => {
        if (activeCatSlug) {
            updatePost({ tagIds: [] });
            setTags([]);
            getTagsRelatingCategory(activeCatSlug)
                .then((data) => {
                    setTags(data);
                })
                .catch((err) => console.log(err.response.data.error.message));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCatSlug]);

    const { title, resume, body, tagIds, coverImage, characterIds } = post;

    const handleUsers = (ev, value) => {
        updatePost({ characterIds: value ? value.map((val) => val.id) : [] });
    };

    const defaultUsers = users.filter((val) => characterIds.includes(val.id));

    const onClickTag = (tagId) => () => {
        if (tagIds.includes(tagId)) {
            updatePost({ tagIds: tagIds.filter((val) => val !== tagId) });
        } else {
            updatePost({ tagIds: [...tagIds, tagId] });
        }
    };

    const tagElements = tags.map((tag) => {
        const isActive = tagIds.includes(tag.id);
        return (
            <Button
                key={tag.id}
                onClick={onClickTag(tag.id)}
                size="small"
                variant="contained"
                className={`${classes.button} ${
                    isActive && classes.activeButton
                }`}
            >
                {getNameByLanguage(tag)}
            </Button>
        );
    });

    const onClickCategory = (categorySlug) => () => {
        setActiveCatSlug(categorySlug);
    };

    const submitPost = () => {
        createPost(post);
    };

    const categoriesRender = !isEmpty(categories)
        ? categories.map((val, key) => (
              <Category
                  isActive={val.slug === activeCatSlug}
                  onClick={onClickCategory(val.slug)}
                  key={val.id}
                  hasBorder={key + 1 !== categories.length}
              >
                  {getNameByLanguage(val).toUpperCase()}
              </Category>
          ))
        : null;

    return (
        <Wrapper>
            <Title>{t('common_add_post')}</Title>
            <TextField
                fullWidth
                className={classes.marginBottom}
                variant="outlined"
                label={t('common_title')}
                value={title}
                onChange={(ev) => updatePost({ title: ev.target.value })}
            />
            <Autocomplete
                multiple
                className={classes.marginBottom}
                options={users}
                getOptionLabel={(u) => `${u.lastName} ${u.firstName}`}
                value={defaultUsers}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label={t('common_main_character')}
                        placeholder={t('common_user_name')}
                    />
                )}
                onChange={handleUsers}
            />
            <TextField
                fullWidth
                className={classes.marginBottom}
                variant="outlined"
                label={t('common_cover_image')}
                value={coverImage}
                onChange={(ev) => updatePost({ coverImage: ev.target.value })}
            />
            <ImageWrapper>
                {!!coverImage && <img src={coverImage} alt="Cover" />}
            </ImageWrapper>
            <TextField
                fullWidth
                className={classes.marginBottom}
                variant="outlined"
                label={t('common_resume')}
                value={resume}
                multiline
                rows="4"
                onChange={(ev) => updatePost({ resume: ev.target.value })}
            />
            <TagsWrapper>
                <CategoriesWrapper>{categoriesRender}</CategoriesWrapper>
                <TagLabel>{`${t('common_tags')}: `}</TagLabel>
                {tagElements}
            </TagsWrapper>
            <SimpleMDEReact
                value={body}
                onChange={(value) => updatePost({ body: value })}
                options={{
                    autofocus: true,
                    spellChecker: false
                }}
            />
            <ButtonWrapper>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={submitPost}
                >
                    {t('common_submit')}
                </Button>
            </ButtonWrapper>
        </Wrapper>
    );
};

export default AddPost;
