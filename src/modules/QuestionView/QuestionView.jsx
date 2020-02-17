import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Question from './Question';
import { getQuestionFn, voteAnswerFn,voteQuestionFn, approveAnswerFn } from '../../actions/questionDetail';
import { showConfirmToLoginFn } from '../../actions/sweetAlert';

import { DefaultWrapper } from '../../component/Wrappers';

import Answer from './Answer';

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
    voteAnswer
}) => {
    const { t } = useTranslation();

    const { question, isVotingQuestion, votingAnswerId } = questionDetail;

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

    const { answerCount, answers } = question;

    const answersRender = answers.map(a => (
        <Answer
            key={a.id}
            answer={a}
            isVoting={votingAnswerId === a.id}
            isAuthenticated={isAuthenticated}
            showConfirmToLogin={showConfirmToLogin}
            voteAnswer={voteAnswer}
        />
    ));

    return (
        <Background>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionView);
