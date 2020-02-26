import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

const ReviewQuestion = ({ title, body, tags }) => {
  const { t } = useTranslation();
  return (
    <section className="mt5 mb3">
      <h3 className="font-size-18 m0">{t('question_review_question')}</h3>
      <h5 className="font-size-14">{t('question_let_one_more_look')}</h5>
      <div className="module p4 width-100">
        <p className="font-weight-700">{t('question_check_for_typos')}.</p>
        <p>{t('question_for_exemple')}:</p>
        <p className="m0">
          <span>
            <i className="fas fa-check" /> {t('question_format_text')}{' '}
            <b>{t('common_bold')}</b> {t('common_and')}{' '}
            <i>{t('common_italic')}</i>
          </span>
          <br />
          <span>
            <i className="fas fa-times" /> {t('question_donnot_include_slang')}
          </span>
        </p>
      </div>
      <p className="mt3">
        <b>
          <i className="fas fa-question-circle" />{' '}
          {t('question_want_more_help')}?{' '}
        </b>
        {t('common_check_out')}
        <a
          className="color-main"
          href="https://www.cirosantilli.com/markdown-style-guide/"
          rel="noopener noreferrer"
          target="_blank"
        >
          {' '}
          {t('question_these_tips_for_editing')}{' '}
        </a>
        {t('question_for_guidance')}.
      </p>
      <div>
        <p className="font-weight-700 m0">{t('common_title')}</p>
        <input
          type="text"
          defaultValue={title}
          disabled={true}
          placeholder={t('question_what_your_programming')}
        />
      </div>
      <div className="content-review mt3">
        <ReactMarkdown className="question-body" source={body} />
      </div>
      <div className="mt2">
        <p className="font-weight-700 m0">{t('common_tags')}</p>
        <div className="tagcloud">
          <div className="question-tags">
            {tags.map((tag, index) => {
              return (
                <button key={index} className="module">
                  {tag.nameEn}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewQuestion;
