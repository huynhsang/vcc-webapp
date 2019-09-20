import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const TitleQuestion = ({ title, setTitle, next, previous }) => {
  const { t } = useTranslation();

  const [titleEditted, setTitleEditted] = React.useState(title || '');

  const onBlurHandler = () => {
    setTitle(titleEditted);
  };

  return (
    <section className="mt5 mb3">
      <h3 className="font-size-18 m0">{t('quetion_what_is_your_title')}</h3>
      <h5 className="font-size-14">{t('question_your_title_help')}</h5>
      <div className="module p4 width-100">
        <p className="font-weight-700">{t('question_imagine_you')}</p>
        <p>{t('common_for_exemple')}</p>
        <p>
          <span>
            <i className="fas fa-check" /> {t('question_is_there_an_R')}
          </span>
          <br />
          <span>
            <i className="fas fa-times" /> {t('question_please_help_with_R')}
          </span>
        </p>
        <p className="m0">
          <span>
            <i className="fas fa-check" /> {t('question_is_there_an_R')}
          </span>
          <br />
          <span>
            <i className="fas fa-times" /> {t('question_please_help_with_R')}
          </span>
        </p>
      </div>
      <div className="mt3">
        <p className="font-weight-700">{t('common_title')}</p>
        <input
          type="text"
          value={titleEditted}
          autoFocus={true}
          onChange={ev => setTitleEditted(ev.target.value)}
          onBlur={onBlurHandler}
        />
      </div>
      <div className="mt3 text-right">
        <button className="btn btn-light mr3" onClick={() => previous('Tags')}>
          {t('common_previous_step')}
        </button>
        <button className="btn btn-primary" onClick={() => next('Description')}>
          {t('common_next')}
        </button>
      </div>
    </section>
  );
};

TitleQuestion.propTypes = {
  next: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default TitleQuestion;
