import React from 'react';
import questionMark from '../../static/resources/img/question_mark_1.png';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next'; 
import i18n from 'i18next';

const TypeQuestion = ({ categories, categoryId, setCategoryId, next }) => {
    const { t } = useTranslation();

    if(!categories){
        return null;
    }

    const categoryOptions = categories.map(category => (
        <div className="mb1" key={category.id}>
            <input
                type="radio"
                id={category.id}
                name="radio-group"
                value={category.id}
                checked={category.id === categoryId}
                onChange={ev => setCategoryId(ev.target.value)}
            />
            <label htmlFor={category.id}>
                {category[i18n.language === 'vi' ? 'nameVi' : 'nameEn']}
            </label>
        </div>
    ));

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
                {categoryOptions}
                <button
                    className="btn btn-primary mt2"
                    onClick={next}
                    disabled={!categoryId}
                >
                    {t('common_next')}
                </button>
            </div>
        </section>
    );
};

TypeQuestion.propTypes = {
    next: PropTypes.func.isRequired,
    category: PropTypes.string
};

export default TypeQuestion;
