import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { useTranslation } from 'react-i18next';

import Tabs from '../../component/Tabs/Tabs';
import TypeQuestionTab from './TypeQuestion';
import TagsQuestionTab from './TagsQuestion';
import TitleQuestionTab from './TitleQuestion';
import DescriptionQuestionTab from './DescriptionQuestion';
import ReviewQuestionTab from './ReviewQuestion';

import {
    showSuccessAlertFn,
    showErrorAlertFn,
    showConfirmToLoginFn
} from '../../actions/sweetAlert';

import { createQuestion } from '../../services/question.service';
import { getCategories } from '../../services/category.service';
import { getTagsRelatingCategory } from '../../services/tags.service';

const AddQuestion = ({
    history,
    showSuccessAlert,
    showErrorAlert,
    App,
    showConfirmToLogin
}) => {
    const { t } = useTranslation();

    const { isAuthenticated, toAuthenticate } = App;

    React.useEffect(() => {
        if (!isAuthenticated && !toAuthenticate) {
            showConfirmToLogin();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, toAuthenticate]);

    const [currentTab, setCurrentTab] = React.useState('Type');

    const [categories, setCategories] = React.useState(null);
    const [tags, setTags] = React.useState(null);

    const [question, setQuestion] = React.useState({
        title: '',
        body: '',
        categoryId: null,
        tagIds: []
    });

    const { categoryId, tagIds, title, body } = question;

    const updateQuestion = obj => setQuestion(state => ({ ...state, ...obj }));

    // Fetch categories
    React.useEffect(() => {
        getCategories()
            .then(data => {
                setCategories(data);
            })
            .catch(err => console.log(err.message));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Fetch tags
    React.useEffect(() => {
        if (categoryId) {
            setTags(null);
            const category = categories.find(cat => cat.id === categoryId);
            getTagsRelatingCategory(category.slug)
                .then(data => {
                    setTags(data);
                })
                .catch(err => console.log(err.message));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId]);

    if (!isAuthenticated) {
        return (
            <div>{t('authentification_this_page_need_to_authenticate')}</div>
        );
    }

    const postQuestion = () => {
        createQuestion({ ...question, isPublic: true })
            .then(data => {
                showSuccessAlert('Success!', 'Created a Question');
                history.push(`/homes/question/${data.slug}/view`);
            })
            .catch(response =>
                showErrorAlert(response.response.data.error.message)
            );
    };

    const isDisabled = !categoryId;

    return (
        <section className="tabs-container pl3 pr3 pt5">
            <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab}>
                <div label="Type">
                    <TypeQuestionTab
                        categories={categories}
                        categoryId={categoryId}
                        setCategoryId={val =>
                            updateQuestion({ categoryId: val })
                        }
                        next={() => setCurrentTab('Tags')}
                    />
                </div>
                <div label="Tags" isDisabled={isDisabled}>
                    <TagsQuestionTab
                        tags={tags}
                        tagIds={tagIds}
                        setTagIds={val => updateQuestion({ tagIds: val })}
                        previous={() => setCurrentTab('Type')}
                        next={() => setCurrentTab('Title')}
                    />
                </div>
                <div label="Title" isDisabled={isDisabled}>
                    <TitleQuestionTab
                        title={title}
                        setTitle={val => updateQuestion({ title: val })}
                        previous={() => setCurrentTab('Tags')}
                        next={() => setCurrentTab('Description')}
                    />
                </div>
                <div label="Description" isDisabled={isDisabled}>
                    <DescriptionQuestionTab
                        body={body}
                        setBody={val => updateQuestion({ body: val })}
                        previous={() => setCurrentTab('Title')}
                        next={() => setCurrentTab('Review')}
                    />
                </div>
                <div label="Review" isDisabled={isDisabled}>
                    <ReviewQuestionTab
                        title={title}
                        body={body}
                        tags={tags && tags.filter(t => tagIds.includes(t.id))}
                        postQuestion={postQuestion}
                    />
                </div>
            </Tabs>
        </section>
    );
};

const mapStateToProps = ({ App }) => ({
    App
});

const mapDispatchToProp = dispatch => ({
    showSuccessAlert: (title, text) =>
        dispatch(showSuccessAlertFn(title, text)),
    showErrorAlert: message => dispatch(showErrorAlertFn('Error!', message)),
    showConfirmToLogin: () => dispatch(showConfirmToLoginFn())
});

export default connect(
    mapStateToProps,
    mapDispatchToProp
)(AddQuestion);
