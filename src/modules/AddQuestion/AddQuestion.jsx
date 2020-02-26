import React from 'react';
import styled from 'styled-components';

import connect from 'react-redux/es/connect/connect';
import { useTranslation } from 'react-i18next';

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

import QuestionTabs from './QuestionTabs';
import { DefaultWrapper } from '../../component/Wrappers';

const Wrapper = styled(DefaultWrapper)`
    min-height: calc(100vh - 180px);
`;

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

    const [activeTab, setActiveTab] = React.useState(0);

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
                history.push(`/questions/${data.slug}`);
            })
            .catch(response =>
                showErrorAlert(response.response.data.error.message)
            );
    };

    const toPrevious = () => setActiveTab(state => state -1);
    const toNext = () => setActiveTab(state => state +1);

    const getContent = step => {
        switch (step) {
            case 0:
                return (
                    <TypeQuestionTab
                        categories={categories}
                        categoryId={categoryId}
                        setCategoryId={val =>
                            updateQuestion({ categoryId: val })
                        }
                        next={toNext}
                    />
                );
            case 1:
                return (
                    <TagsQuestionTab
                        tags={tags}
                        tagIds={tagIds}
                        setTagIds={val => updateQuestion({ tagIds: val })}
                        previous={toPrevious}
                        next={toNext}
                    />
                );
            case 2:
                return (
                    <TitleQuestionTab
                        title={title}
                        setTitle={val => updateQuestion({ title: val })}
                        previous={toPrevious}
                        next={toNext}
                    />
                );
            case 3:
                return (
                    <DescriptionQuestionTab
                        body={body}
                        setBody={val => updateQuestion({ body: val })}
                        previous={toPrevious}
                        next={toNext}
                    />
                );
            case 4:
                return (
                    <ReviewQuestionTab
                        title={title}
                        body={body}
                        tags={tags && tags.filter(t => tagIds.includes(t.id))}
                        postQuestion={postQuestion}
                    />
                );
            default:
                return 'Unknown step';
        }
    };

    const Content = getContent(activeTab);

    const isBlockSteps = !categoryId;

    return (
        <Wrapper>
            <QuestionTabs
                isBlock={isBlockSteps}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            {Content}
        </Wrapper>
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

export default connect(mapStateToProps, mapDispatchToProp)(AddQuestion);
