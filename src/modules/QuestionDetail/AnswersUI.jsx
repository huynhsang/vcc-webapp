import React from 'react';
import { connect } from 'react-redux';

import { Answer } from '../../domain/Answer';
import { Link, withRouter } from 'react-router-dom';
import SimpleMDEReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import { useTranslation } from 'react-i18next';
import ApplicationUtil from '../../common/util/ApplicationUtil';
import {
  showSuccessAlertFn,
  showErrorAlertFn,
  showConfirmToLoginFn
} from '../../actions/sweetAlert';

import AnswerComponent from './Answer';

import { createAnswer } from '../../services/answer.service';

const AnswersUI = ({
  history,
  answers,
  question,
  updateQuestion,
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
    createAnswer(question.id, answerBody)
      .then(data => {
        const answers = answersEditted || [];
        answers.unshift(data);
        showSuccessNotification('Success!', 'Leaved an answer');
        setAnswersEditted(answers);
        setAnswerBody('');
      })
      .catch(err => {
        showErrorNotification(err.response.data);
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
                  <Link to="?show=voted">{t('common_voted')}</Link>
                </li>
                <li>
                  <Link to="?show=oldest">{t('common_oldest')}</Link>
                </li>
                <li>
                  <Link to="?show=recent">{t('common_rencent')}</Link>
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
                showSuccessNotification={showSuccessNotification}
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
    </div>
  );
};

const mapStateToProps = ({ App: { isAuthenticated } }) => ({
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
