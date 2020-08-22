import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { editPost, getPost } from '../../services/post.service';
import { errorAlertFn, successAlertFn } from '../../actions/alertConfirm';
import { PostEditForm } from '../AddPost';

const EditPost = ({ errorAlert, successAlert, history, match }) => {
    const [editedPost, setEditedPost] = React.useState(null);

    const { t } = useTranslation();
    const postId = match && match.params && match.params.postId;

    React.useEffect(() => {
        getPost(postId)
            .then((data) => {
                if (data) {
                    const {
                        title,
                        imageList,
                        resume,
                        tagList,
                        body,
                        characterList,
                        id
                    } = data;

                    setEditedPost({
                        title,
                        resume,
                        body,
                        coverImage:
                            imageList && imageList[0]
                                ? imageList[0].lrg || ''
                                : '',
                        tagIds: (tagList || [])
                            .filter(Boolean)
                            .map((val) => val.id),
                        characterIds: (characterList || [])
                            .filter(Boolean)
                            .map((val) => val.id),
                        id
                    });
                }
            })
            .catch((err) => console.error(err));
    }, [postId]);

    if (!editedPost || !editedPost.id) {
        return null;
    }

    const submitPost = (post) => {
        const { id, ...data } = post;
        editPost(id, data)
            .then(() => {
                successAlert(t('posts_create_success'));
                history.push('/posts');
            })
            .catch((err) => errorAlert(err.response.data.error.message));
    };

    return (
        <PostEditForm
            iniPost={editedPost}
            save={submitPost}
            history={history}
        />
    );
};

const mapDispatchToProps = (dispatch) => ({
    errorAlert: (text) => dispatch(errorAlertFn(text)),
    successAlert: (text) => dispatch(successAlertFn(text))
});

export default connect(null, mapDispatchToProps)(EditPost);
