import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Question from './Question';
import {
    getQuestionFn,
    voteAnswerFn,
    voteQuestionFn,
    approveAnswerFn
} from '../../actions/questionDetail';
import {
    showConfirmToLoginFn,
    showErrorAlertFn
} from '../../actions/sweetAlert';
import { createAnswerFn } from '../../actions/questionDetail';

import { DefaultWrapper } from '../../component/Wrappers';

import Answer from './Answer';
import AnswerForm from './AnswerForm';

import { getIdAndToken } from '../../utils/cookie-tools';
import { PageCover } from '../Header';

const Background = styled.div`
    background-color: #f4f4f4;
    min-height: calc(100vh - 180px);
`;

const AnswerWrapper = styled.div`
    background-color: white;
    padding: 20px;
    user-select: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    margin-top: 20px;
`;

const AnswerCount = styled.div`
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 10px;
    & span {
        color: black;
        margin-right: 10px;
    }
`;

const QuestionView = ({
    match,
    isAuthenticated,
    questionDetail,
    getQuestion,
    history,
    showConfirmToLogin,
    voteQuestion,
    voteAnswer,
    showErrorNotification,
    createAnswer,
    approveAnswer
}) => {
    const { t } = useTranslation();
    const { id: currentUserId } = getIdAndToken();

    const {
        question,
        isVotingQuestion,
        votingAnswerId,
        isCreatingAnswer,
        isFetchingError
    } = questionDetail;

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

    const { answerCount, answers, askedBy, bestAnswerItem } = question;

    const isQuestionOwner = askedBy.id === currentUserId;

    const answersRender = answers.map(a => {
        const isAnswerOwner = a.answerBy && a.answerBy.id === currentUserId;
        const approveAnswerInner =
            !bestAnswerItem && isQuestionOwner && !isAnswerOwner
                ? () => approveAnswer(question.id, a.id)
                : null;

        return (
            <Answer
                key={a.id}
                answer={a}
                isVoting={votingAnswerId === a.id}
                isAuthenticated={isAuthenticated}
                showConfirmToLogin={showConfirmToLogin}
                voteAnswer={voteAnswer}
                approveAnswer={approveAnswerInner}
                isBestAnswer={bestAnswerItem && bestAnswerItem.id === a.id}
            />
        );
    });

    return (
        <Background>
            <PageCover />
            <DefaultWrapper>
                <Question
                    question={question}
                    history={history}
                    isAuthenticated={isAuthenticated}
                    showConfirmToLogin={showConfirmToLogin}
                    voteQuestion={voteQuestion}
                    isVoting={isVotingQuestion}
                />
                <AnswerWrapper>
                    <AnswerCount>
                        <span>{answerCount}</span>
                        {t('common_answer')}
                    </AnswerCount>
                    {answersRender}
                </AnswerWrapper>
                <AnswerForm
                    questionId={question.id}
                    reloadQuestion={fetchQuestion}
                    isAuthenticated={isAuthenticated}
                    createAnswer={createAnswer}
                    showErrorNotification={showErrorNotification}
                    showConfirmToLogin={showConfirmToLogin}
                    isCreatingAnswer={isCreatingAnswer}
                    isFetchingError={isFetchingError}
                />
            </DefaultWrapper>
        </Background>
    );
};

const mapStateToProps = ({ questionDetail, App: { isAuthenticated } }) => ({
    questionDetail,
    isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    getQuestion: slug => dispatch(getQuestionFn(slug)),
    showConfirmToLogin: () => dispatch(showConfirmToLoginFn()),
    voteQuestion: (questionId, action) =>
        dispatch(voteQuestionFn(questionId, action)),
    voteAnswer: (answerId, action) => dispatch(voteAnswerFn(answerId, action)),
    showErrorNotification: text => dispatch(showErrorAlertFn('Error!', text)),
    createAnswer: (questionId, answerBody) =>
        dispatch(createAnswerFn(questionId, answerBody)),
    approveAnswer: (questionId, answerId) =>
        dispatch(approveAnswerFn(questionId, answerId))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionView);