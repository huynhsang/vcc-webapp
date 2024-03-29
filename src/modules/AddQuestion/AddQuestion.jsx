import React from 'react';
import styled from 'styled-components';
import qs from 'qs';

import connect from 'react-redux/es/connect/connect';
import { useTranslation } from 'react-i18next';

import QuestionCategory from './QuestionCategory';
import QuestionTags from './QuestionTags';
import QuestionTitle from './QuestionTitle';
import QuestionDescription from './QuestionDescription';
import QuestionReview from './QuestionReview';
import QuestionSituation from './QuestionSituation';

import {
    showLoginConfirmFn,
    errorAlertFn,
    successAlertFn,
    infoAlertFn
} from '../../actions/alertConfirm';

import { createQuestion } from '../../services/question.service';
import { getCategories } from '../../services/category.service';
import { getUsers } from '../../services/user.service';
import { getTags } from '../../services/tags.service';
import QuestionTabs from './QuestionTabs';
import { DefaultWrapper } from '../../component/Wrappers';
import Button from '@material-ui/core/Button';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const Wrapper = styled(DefaultWrapper)`
    min-height: calc(100vh - 165px);

    ${media.tabletLandscape`
        min-height: calc(100vh - 368px);
    `}
`;

const ButtonsWrapper = styled.div`
    text-align: right;
    margin-top: 20px;

    & button {
        margin: 0 10px;
    }
`;

const AddQuestion = ({
    history,
    successAlert,
    errorAlert,
    infoAlert,
    App,
    showLoginConfirm,
    location
}) => {
    const { t } = useTranslation();

    const { isAuthenticated, toAuthenticate, currentUser } = App;

    React.useEffect(() => {
        if (!isAuthenticated && !toAuthenticate) {
            showLoginConfirm();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, toAuthenticate]);

    const [activeTab, setActiveTab] = React.useState(0);

    const [categories, setCategories] = React.useState(null);
    const [tags, setTags] = React.useState(null);
    const [usersToMatch, setUsersToMatch] = React.useState(null);

    const { userAsked } = qs.parse(location.search.substr(1));

    const [question, setQuestion] = React.useState({
        title: '',
        body: '',
        categoryId: null,
        tagIds: [],
        isPublic: true,
        supporterIds: userAsked ? [userAsked] : []
    });

    const {
        categoryId,
        tagIds,
        title,
        body,
        isPublic,
        supporterIds
    } = question;

    const updateQuestion = (obj) =>
        setQuestion((state) => ({ ...state, ...obj }));

    // Fetch categories
    React.useEffect(() => {
        getCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => console.log(err.message));

        getUsers({
            filter: {
                skip: 0,
                limit: 1000
            }
        })
            .then((data) => {
                setUsersToMatch(
                    data.filter((val) => val.id !== currentUser.id)
                );
            })
            .catch((err) => console.log(err.message));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Fetch tags
    React.useEffect(() => {
        if (categoryId) {
            setTags(null);
            updateQuestion({ tagIds: [] });
            const category = categories.find((cat) => cat.id === categoryId);
            const filter = {
                limit: 100
            };
            if (category.slug) {
                filter.categorySlug = category.slug;
            }
            getTags({ filter })
                .then((data) => {
                    setTags(data.filter(Boolean));
                })
                .catch((err) => console.log(err.message));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId]);

    if (!isAuthenticated) {
        return (
            <Wrapper>
                {t('authentification_this_page_need_to_authenticate')}
            </Wrapper>
        );
    }

    const postQuestion = () => {
        if (title.length < 20) {
            return errorAlert(t('question_created_title_limit'));
        }
        if (body.length < 20) {
            return errorAlert(t('question_created_body_limit'));
        }
        createQuestion(question)
            .then((data) => {
                successAlert(t('question_created_a_question'));
                history.push(`/topics/${data.slug}`);
            })
            .catch((response) =>
                errorAlert(response.response.data.error.message)
            );
    };

    const toPrevious = () => setActiveTab((state) => state - 1);
    const toNext = () => setActiveTab((state) => state + 1);

    const getContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <QuestionCategory
                        categories={categories}
                        categoryId={categoryId}
                        setCategoryId={(val) =>
                            updateQuestion({ categoryId: val })
                        }
                    />
                );
            case 1:
                return (
                    <QuestionTags
                        tags={tags}
                        tagIds={tagIds}
                        setTagIds={(val) => updateQuestion({ tagIds: val })}
                        infoAlert={infoAlert}
                    />
                );
            case 2:
                return (
                    <QuestionTitle
                        title={title}
                        setTitle={(val) => updateQuestion({ title: val })}
                    />
                );
            case 3:
                return (
                    <QuestionDescription
                        body={body}
                        setBody={(val) => updateQuestion({ body: val })}
                    />
                );
            case 4:
                return (
                    <QuestionSituation
                        usersToMatch={usersToMatch}
                        isPublic={isPublic}
                        supporterIds={supporterIds}
                        setIsPublic={(val) => updateQuestion({ isPublic: val })}
                        setSupporterIds={(val) =>
                            updateQuestion({ supporterIds: val })
                        }
                    />
                );
            case 5:
                return (
                    <QuestionReview
                        title={title}
                        body={body}
                        category={categories.find(
                            (cat) => cat.id === categoryId
                        )}
                        tags={tags && tags.filter((t) => tagIds.includes(t.id))}
                        supporters={usersToMatch.filter((u) =>
                            supporterIds.includes(u.id)
                        )}
                        isPublic={isPublic}
                    />
                );
            default:
                return 'Unknown step';
        }
    };

    const Content = getContent(activeTab);

    const isBlockSteps = !categoryId || (!isPublic && supporterIds.length <= 0);

    return (
        <Wrapper>
            <QuestionTabs
                isBlock={isBlockSteps}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            {Content}
            <ButtonsWrapper>
                {activeTab >= 1 && (
                    <Button variant="contained" onClick={toPrevious}>
                        {t('common_previous_step')}
                    </Button>
                )}
                {activeTab === 5 ? (
                    <Button
                        variant="contained"
                        onClick={postQuestion}
                        color="primary"
                    >
                        {t('question_post_your_question')}
                    </Button>
                ) : (
                    <Button
                        disabled={isBlockSteps}
                        variant="contained"
                        onClick={toNext}
                        color="primary"
                    >
                        {t('common_next')}
                    </Button>
                )}
            </ButtonsWrapper>
        </Wrapper>
    );
};

const mapStateToProps = ({ App }) => ({
    App
});

const mapDispatchToProp = (dispatch) => ({
    infoAlert: (text) => dispatch(infoAlertFn(text)),
    successAlert: (text) => dispatch(successAlertFn(text)),
    errorAlert: (text) => dispatch(errorAlertFn(text)),
    showLoginConfirm: () => dispatch(showLoginConfirmFn())
});

export default connect(mapStateToProps, mapDispatchToProp)(AddQuestion);
