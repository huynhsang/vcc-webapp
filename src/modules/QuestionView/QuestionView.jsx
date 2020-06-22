import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Question from './Question';
import {
    getQuestionFn,
    voteAnswerFn,
    voteQuestionFn,
    approveAnswerFn,
    removeAnswerFn
} from '../../actions/questionDetail';
import { showLoginConfirmFn, errorAlertFn } from '../../actions/alertConfirm';
import { createAnswerFn } from '../../actions/questionDetail';

import { DefaultWrapper } from '../../component/Wrappers';

import Answer from './Answer';
import AnswerForm from './AnswerForm';

import { getIdAndToken } from '../../utils/cookie-tools';
import { PageCover } from '../Header';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EyeIcon from '@material-ui/icons/RemoveRedEye';

import { deleteQuestion } from '../../services/question.service';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { ROLES } from '../../constants/constants';

import { ConfirmModal } from '../ConfirmModal';

import { createMediaTemplate } from '../../utils/css-tools';
const media = createMediaTemplate();

const useStyles = makeStyles(() => ({
    linkButton: {
        color: 'rgba(0, 0, 0, 0.58)',
        marginBottom: 10
    },
    deleteButton: {
        marginBottom: '5px'
    }
}));

const Background = styled.div`
    background-color: #f4f4f4;
    min-height: calc(100vh - 180px);
`;

const AnswerWrapper = styled.div`
    background-color: white;
    padding: 10px 20px;
    user-select: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    margin-top: 20px;
    ${media.mobileLandscape`
        padding: 5px 10px;
        margin-top: 10px;
    `}
`;

const QuestionInfos = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    padding-bottom: 5px;
`;

const AnswerCount = styled.div`
    & span {
        color: red;
        margin-right: 5px;
    }
`;

const Wrapper = styled(DefaultWrapper)`
    padding: 10px 20px;
`;

const View = styled.div`
    display: flex;
    align-items: center;
    margin-left: 8px;
    color: #000000b3;
    & svg {
        margin-right: 5px;
        font-size: 1.1rem;
    }
`;

const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const QuestionView = ({
    match,
    isAuthenticated,
    questionDetail,
    getQuestion,
    history,
    showLoginConfirm,
    voteQuestion,
    voteAnswer,
    errorAlert,
    createAnswer,
    approveAnswer,
    removeAnswer
}) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { id: currentUserId, role: userRole } = getIdAndToken();

    const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);

    const { question, isCreatingAnswer, isFetchingError } = questionDetail;

    const slug = match && match.params && match.params.slug;

    const fetchQuestion = () => {
        if (slug) {
            getQuestion(slug);
        }
    };

    React.useEffect(() => {
        fetchQuestion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug, isAuthenticated]);

    if (!question) {
        return null;
    }

    const {
        answerCount,
        answers,
        askedBy,
        bestAnswerItem,
        viewCount
    } = question;

    const deleteQuestionFn = () => {
        setIsOpenDeleteModal(true);
    };

    const isQuestionOwner = askedBy.id === currentUserId;

    const answersRender = answers.map((a) => {
        const isAnswerOwner = a.answerBy && a.answerBy.id === currentUserId;
        const approveAnswerInner =
            !bestAnswerItem && isQuestionOwner && !isAnswerOwner
                ? () => approveAnswer(question.id, a.id)
                : null;

        return (
            <Answer
                key={a.id}
                answer={a}
                isAuthenticated={isAuthenticated}
                showLoginConfirm={showLoginConfirm}
                voteAnswer={voteAnswer}
                approveAnswer={approveAnswerInner}
                isBestAnswer={bestAnswerItem && bestAnswerItem.id === a.id}
                history={history}
                removeAnswer={removeAnswer}
            />
        );
    });

    const isAdmin = ROLES.ADMIN === userRole;

    return (
        <>
            <Background>
                <PageCover />
                <Wrapper>
                    <FlexWrapper>
                        <Button
                            onClick={() => history.goBack()}
                            className={classes.linkButton}
                            startIcon={<ChevronLeftIcon />}
                        >
                            {t('common_come_back')}
                        </Button>
                        {(isAdmin || isQuestionOwner) && (
                            <IconButton
                                className={classes.deleteButton}
                                color="secondary"
                                onClick={deleteQuestionFn}
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </FlexWrapper>
                    <Question
                        question={question}
                        history={history}
                        isAuthenticated={isAuthenticated}
                        showLoginConfirm={showLoginConfirm}
                        voteQuestion={voteQuestion}
                    />
                    <AnswerWrapper>
                        <QuestionInfos>
                            <AnswerCount>
                                <span>{answerCount}</span>
                                {t('common_answer')}
                            </AnswerCount>
                            <View>
                                <EyeIcon />
                                <span>{`${viewCount} ${t(
                                    'common_views'
                                )}`}</span>
                            </View>
                        </QuestionInfos>
                        {answersRender}
                    </AnswerWrapper>
                    <AnswerForm
                        questionId={question.id}
                        reloadQuestion={fetchQuestion}
                        isAuthenticated={isAuthenticated}
                        createAnswer={createAnswer}
                        errorAlert={errorAlert}
                        showLoginConfirm={showLoginConfirm}
                        isCreatingAnswer={isCreatingAnswer}
                        isFetchingError={isFetchingError}
                    />
                </Wrapper>
            </Background>
            <ConfirmModal
                isOpen={isOpenDeleteModal}
                action={() => deleteQuestion(question.id, history)}
                title={t('question_do_you_want_to_delete_this_question')}
                cancel={() => setIsOpenDeleteModal(false)}
            />
        </>
    );
};

const mapStateToProps = ({ questionDetail, App: { isAuthenticated } }) => ({
    questionDetail,
    isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
    getQuestion: (slug) => dispatch(getQuestionFn(slug)),
    showLoginConfirm: () => dispatch(showLoginConfirmFn()),
    voteQuestion: (questionId, action) =>
        dispatch(voteQuestionFn(questionId, action)),
    voteAnswer: (answerId, action) => dispatch(voteAnswerFn(answerId, action)),
    errorAlert: (text) => dispatch(errorAlertFn(text)),
    createAnswer: (questionId, answerBody) =>
        dispatch(createAnswerFn(questionId, answerBody)),
    approveAnswer: (questionId, answerId) =>
        dispatch(approveAnswerFn(questionId, answerId)),
    removeAnswer: (id) => dispatch(removeAnswerFn(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionView);
