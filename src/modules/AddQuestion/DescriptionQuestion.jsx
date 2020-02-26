import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SimpleMDEReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const DescriptionQuestion = ({ setBody, body }) => {
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
    </section>
  );
};

export default DescriptionQuestion;
