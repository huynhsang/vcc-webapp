import React from 'react';
import questionMark from '../../../../static/resources/img/question_mark_1.png';
import ApplicationConstant from '../../../../common/constant/ApplicationConstant';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

const TypeQuestion = ({ category, next }) => {

  const {t} = useTranslation();

  const [categorySelected, setCategorySelected] = React.useState(category);

  const onChangeHandler = e => {
    setCategorySelected(e.target.value);
  };

  const { studying, working, immigration } = ApplicationConstant.category;

  return (
    <section className="row mt5 mb3">
      <div className="col-md-5">
        <img
          className="img-responsive"
          src={questionMark}
          alt="question mark"
        />
      </div>
      <div className="col-md-7">
        <h3 className="font-size-18 m0">
          {t('question_what_category_of_questions')}
        </h3>
        <h5 className="font-size-14">
          {t('question_we_will_help_you')}
        </h5>
        <div className="mb1">
          <input
            type="radio"
            id="studying"
            name="radio-group"
            value={studying}
            checked={categorySelected === studying}
            onChange={onChangeHandler}
          />
          <label htmlFor="studying">{t('question_i_have_a_question_about')}</label>
        </div>
        <div className="mb1">
          <input
            type="radio"
            id="working"
            name="radio-group"
            value={working}
            checked={categorySelected === working}
            onChange={onChangeHandler}
          />
          <label htmlFor="working">{t('question_i_nedd_help_with')}</label>
        </div>
        <div className="mb1">
          <input
            type="radio"
            id="immigration"
            name="radio-group"
            value={immigration}
            checked={categorySelected === immigration}
            onChange={onChangeHandler}
          />
          <label htmlFor="immigration">
            {t('question_i_nedd_to_troubleshoot')}
          </label>
        </div>
        <button
          className="btn btn-primary mt2"
          onClick={() => next(categorySelected)}
          disabled={!categorySelected}
        >
          {t('common_next')}
        </button>
      </div>
    </section>
  );
};

TypeQuestion.propTypes = {
  next: PropTypes.func.isRequired,
  category: PropTypes.string,
};

export default TypeQuestion;