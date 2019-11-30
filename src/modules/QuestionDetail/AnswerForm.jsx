import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import 'easymde/dist/easymde.min.css';
import SimpleMDEReact from 'react-simplemde-editor';

import {
    showErrorAlertFn,
    showConfirmToLoginFn,
    showSuccessAlertFn
} from '../../actions/sweetAlert';

import { createAnswerFn } from '../../actions/questionDetail';

const AnswerForm = ({
    questionId,
    reloadQuestion,
    isAuthenticated,
    createAnswer,
    showErrorNotification,
    showConfirmToLogin,
    showSuccessNotification,
    questionDetail
}) => {
    const { t } = useTranslation();

    const [isMounted, setIsMounted] = React.useState(false);

    const [leaveAnswer, setLeaveAnswer] = React.useState(false);
    const [answerBody, setAnswerBody] = React.useState('');

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const { isCreatingAnswer, isFetchingError } = questionDetail;

    React.useEffect(() => {
        if (isMounted && !isFetchingError) {
            reloadQuestion();
            setLeaveAnswer(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCreatingAnswer]);

    const leaveAnswerValidation = () => {
        if (!isAuthenticated) {
            return showConfirmToLogin();
        }
        setLeaveAnswer(true);
    };

    const onSubmit = event => {
        event.preventDefault();

        if (answerBody.length < 20) {
            return showErrorNotification(t('question_answer_min_20'));
        }
        createAnswer(questionId, answerBody);
    };

    const handleChangeAnswerBody = value => {
        if (value.length < 10000) {
            setAnswerBody(value);
        }
    };

    return (
        <div id="respond" className="comment-respond">
            {!leaveAnswer ? (
                <div
                    className="button-default show-answer-form"
                    onClick={leaveAnswerValidation}
                >
                    {t('answer_leave_answer')}
                </div>
            ) : (
                <h3 className="section-title">{t('answer_leave_answer')}</h3>
            )}
            {leaveAnswer && (
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
            )}
        </div>
    );
};

const mapStateToProps = ({ App: { isAuthenticated }, questionDetail }) => ({
    isAuthenticated,
    questionDetail
});

const mapDispatchToProps = dispatch => ({
    showErrorNotification: text => dispatch(showErrorAlertFn('Error!', text)),
    showConfirmToLogin: () => dispatch(showConfirmToLoginFn()),
    showSuccessNotification: (title, text) =>
        dispatch(showSuccessAlertFn(title, text)),
    createAnswer: (questionId, answerBody) =>
        dispatch(createAnswerFn(questionId, answerBody))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AnswerForm));
