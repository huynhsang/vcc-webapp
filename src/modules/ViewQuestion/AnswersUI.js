import React from 'react';
import { connect } from 'react-redux';

import { Answer } from '../../domain/Answer';
import { Link, withRouter } from 'react-router-dom';
import SimpleMDEReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import { useTranslation } from 'react-i18next';
import ApplicationUtil from '../../common/util/ApplicationUtil';
import CoreService from '../../global/CoreService';
import {
    showSuccessAlertFn,
    showErrorAlertFn,
    showConfirmToLoginFn
} from '../../actions/sweetAlert';

import AnswerComponent from './Answer';
import produce from 'immer';

const { answerService } = CoreService;

const AnswersUI = ({
    history,
    answers,
    question,
    updateQuestion,
    updateAnswers,
    handleVoteAnswer,
    isAuthenticated,
    showErrorNotification,
    showSuccessNotification,
    showConfirmToLogin
}) => {
    const { t } = useTranslation();

    const [answersEditted, setAnswersEditted] = React.useState(answers);
    const [leaveAnswer, setLeaveAnswer] = React.useState(false);
    const [answerBody, setAnswerBody] = React.useState('');

    //TO DO: verify
    React.useEffect(() => {
        setAnswersEditted(answers);
    }, [answers]);

    const onSubmit = event => {
        event.preventDefault();

        const descrLength: number = answerBody.length / 3;
        const answerRequest: Answer = {
            body: answerBody,
            description: answerBody.substring(0, descrLength),
            questionId: question.id
        };
        answerService.create(answerRequest).then((result: Result) => {
            if (result.success) {
                const answers = answersEditted || [];
                answers.unshift(result.data);
                showSuccessNotification('Success!', 'Leaved an answer');
                setAnswersEditted(answers);
                setAnswerBody('');
            } else {
                showErrorNotification(result.data);
            }
        });
    };

    const handleChangeAnswerBody = value => {
        if (value.length < 10000) {
            setAnswerBody(value);
        }
    };

    const leaveAnswerValidation = () => {
        if (!isAuthenticated) {
            return showConfirmToLogin();
        }
        setLeaveAnswer(true);
    };

    const updateAnswer = index => ({
        votes,
        isPositiveVote,
        numberOfVotes
    }) => {
        updateAnswers(
            produce(draft => {
                if (votes) {
                    draft[index].votes = votes;
                    draft[index].numberOfVotes = numberOfVotes;
                } else {
                    draft[index].votes[0].isPositiveVote = isPositiveVote;
                    draft[index].numberOfVotes = numberOfVotes;
                }
            })
        );
    };

    return (
        <div className="question-adv-comments question-has-comments question-has-tabs">
            <div id="comments" className="post-section">
                <div className="post-inner">
                    <div className="answers-tabs">
                        <h3 className="section-title">
                            <span>{question.numberOfAnswers} </span>
                            {t('common_answers')}
                        </h3>
                        <div className="answers-tabs-inner">
                            <ul>
                                <li className="active-tab">
                                    <Link to="?show=voted">
                                        {t('common_voted')}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="?show=oldest">
                                        {t('common_oldest')}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="?show=recent">
                                        {t('common_rencent')}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="clearfix" />
                    </div>
                    <ol className="commentlist clearfix custom-comment-list">
                        {answersEditted.map((answer: Answer, index: number) => (
                            <AnswerComponent
                                key={index}
                                answer={answer}
                                question={question}
                                updateQuestion={updateQuestion}
                                handleVoteAnswer={handleVoteAnswer}
                                showErrorNotification={showErrorNotification}
                                showSuccessNotification={
                                    showSuccessNotification
                                }
                                updateAnswer={updateAnswer(index)}
                                showConfirmToLogin={showConfirmToLogin}
                            />
                        ))}
                    </ol>
                    <div className="clearfix" />
                </div>
            </div>
            <div id="respond" className="comment-respond">
                {!leaveAnswer ? (
                    <div
                        className="button-default show-answer-form"
                        onClick={leaveAnswerValidation}
                    >
                        {t('answer_leave_answer')}
                    </div>
                ) : (
                    <h3 className="section-title">
                        {t('answer_leave_answer')}
                    </h3>
                )}
                {leaveAnswer ? (
                    <form
                        id="commentform"
                        className="post-section comment-form answers-form"
                        onSubmit={onSubmit}
                    >
                        <SimpleMDEReact
                            value={answerBody}
                            onChange={handleChangeAnswerBody}
                            options={{
                                autofocus: true,
                                spellChecker: false
                            }}
                        />
                        <p className="form-submit">
                            <input
                                name="submit"
                                type="submit"
                                id="submit"
                                className="button-default button-hide-click"
                                defaultValue="Submit"
                            />
                            <span className="clearfix" />
                        </p>
                    </form>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

const mapStateToProps = ({ AppAuth: isAuthenticated }) => ({
    isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    showErrorNotification: data =>
        dispatch(showErrorAlertFn('Error!', ApplicationUtil.getErrorMsg(data))),
    showSuccessNotification: (title, text) =>
        dispatch(showSuccessAlertFn(title, text)),
    showConfirmToLogin: () => dispatch(showConfirmToLoginFn())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AnswersUI));
