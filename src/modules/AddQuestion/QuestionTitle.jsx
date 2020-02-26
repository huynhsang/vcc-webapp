import React from 'react';
import { useTranslation } from 'react-i18next';

const QuestionTitle =({ title, setTitle }) => {
  const { t } = useTranslation();

  const handleTitle = (ev) => {
    const {value} = ev.target;
    setTitle(value.replace(/ +/g, ' '));
  }

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
      </div>
      <div className="mt3">
        <p className="font-weight-700">{t('common_title')}</p>
        <input
          type="text"
          value={title}
          autoFocus={true}
          onChange={handleTitle}
        />
      </div>
    </section>
  );
};

export default QuestionTitle;
