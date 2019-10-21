import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SimpleMDEReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import PropTypes from 'prop-types';

const DescriptionQuestion = ({ setBody, body, next, previous }) => {
  const { t } = useTranslation();

  const [questionBody, setQuestionBody] = React.useState(body);

  const onChangeHandler = value => {
    setQuestionBody(value);
    setBody(value);
  };

  return (
    <section className="mt5 mb3">
      <h3 className="font-size-18 m0">
        {t('question_tell_us_your_questions')}
      </h3>
      <h5 className="font-size-14">{t('question_your_description')}</h5>
      <p>
        <b>
          <i className="fas fa-question-circle" />{' '}
          {t('question_want_more_help')}?{' '}
        </b>
        {t('question_check_out_these_examples')}:
        <Link className="color-main" to="/">
          {' '}
          Example 1
        </Link>
        ,
        <Link className="color-main" to="/">
          {' '}
          Example 2
        </Link>
      </p>

      <SimpleMDEReact
        value={questionBody}
        onChange={onChangeHandler}
        options={{
          autofocus: true,
          spellChecker: false,
        }}
      />

      <div className="mt3 text-right">
        <button className="btn btn-light mr3" onClick={() => previous('Title')}>
          {t('common_previous_step')}
        </button>
        <button className="btn btn-primary" onClick={() => next('Review')}>
          {t('common_next')}
        </button>
      </div>
    </section>
  );
};

DescriptionQuestion.propTypes = {
  body: PropTypes.string.isRequired,
  next: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
  setBody: PropTypes.func.isRequired,
};

export default DescriptionQuestion;
