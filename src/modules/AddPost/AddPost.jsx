import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createPost } from '../../services/post.service';
import { errorAlertFn, successAlertFn } from '../../actions/alertConfirm';
import PostEditForm from './PostEditForm';

const AddPost = ({ errorAlert, successAlert, history }) => {
    const { t } = useTranslation();

    const submitPost = (post) => {
        createPost(post)
            .then(() => {
                successAlert(t('posts_create_success'));
                history.push('/posts');
            })
            .catch((err) => errorAlert(err.response.data.error.message));
    };

    return <PostEditForm save={submitPost} history={history} />;
};

const mapDispatchToProps = (dispatch) => ({
    errorAlert: (text) => dispatch(errorAlertFn(text)),
    successAlert: (text) => dispatch(successAlertFn(text))
});

export default connect(null, mapDispatchToProps)(AddPost);
