import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { DefaultWrapper } from '../../component/Wrappers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SimpleMDEReact from 'react-simplemde-editor';
import { getTags } from '../../services/tags.service';
import { getUsers } from '../../services/user.service';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles(() => ({
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

const AddPost = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    const [tags, setTags] = React.useState([]);
    const [users, setUsers] = React.useState([]);

    // Fetch tags
    React.useEffect(() => {
        getTags()
            .then(data => {
                setTags(data || []);
            })
            .catch(err => console.log(err.response.data.error.message));

        getUsers()
            .then(data => {
                setUsers(data || []);
            })
            .catch(err => console.log(err.response.data.error.message));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [post, setPost] = React.useState({
        title: '',
        coverImage: '',
        resume: '',
        tagIds: [],
        mainCharacter: '',
        body: ''
    });

    const updatePost = obj => setPost(state => ({ ...state, ...obj }));

    const { title, resume, body, tagIds, coverImage, mainCharacter } = post;

    const handleTags = (ev, value) => {
        updatePost({ tagIds: value ? value.map(val => val.id) : [] });
    };

    const handleUsers = (ev, value) => {
        updatePost({ mainCharacter: value ? value.pop().id : '' });
    };

    const defaultTags = tags.filter(val => tagIds.includes(val.id));

    const userFound = users.find(val => val.id === mainCharacter);
    const defaultUsers = userFound ? [userFound] : [];

    return (
        <Wrapper>
            <Title>{t('common_add_post')}</Title>
            <TextField
                fullWidth
                className={classes.marginBottom}
                variant="outlined"
                label={t('common_title')}
                value={title}
                onChange={ev => updatePost({ title: ev.target.value })}
            />
            <Autocomplete
                multiple
                className={classes.marginBottom}
                options={users}
                getOptionLabel={u => `${u.lastName} ${u.firstName}`}
                value={defaultUsers}
                filterSelectedOptions
                renderInput={params => (
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
                onChange={ev => updatePost({ coverImage: ev.target.value })}
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
                onChange={ev => updatePost({ resume: ev.target.value })}
            />
            <Autocomplete
                multiple
                className={classes.marginBottom}
                options={tags}
                getOptionLabel={tag => tag.nameEn}
                value={defaultTags}
                filterSelectedOptions
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label={t('common_tags')}
                        placeholder="Tag"
                    />
                )}
                onChange={handleTags}
            />
            <SimpleMDEReact
                value={body}
                onChange={value => updatePost({ body: value })}
                options={{
                    autofocus: true,
                    spellChecker: false
                }}
            />
            <ButtonWrapper>
                <Button variant="contained" color="primary">
                    {t('common_submit')}
                </Button>
            </ButtonWrapper>
        </Wrapper>
    );
};

export default AddPost;
