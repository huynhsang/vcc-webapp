import React from 'react';
import { useTranslation } from 'react-i18next';

import Autocomplete from '../../component/Autocomplete/AutoComplete';

const TagsQuestion = ({ tags, tagIds, setTagIds, next, previous }) => {
    const { t } = useTranslation();

    if (!tags) {
        return <div />;
    }

    const onSelectTag = tag => {
        setTagIds([...tagIds, tag.id]);
    };

    const onRemoveTag = id => {
        setTagIds(tagIds.filter(tag => tag.id !== id));
    };

    return (
        <section className="mt5 mb3">
            <h3 className="font-size-18 m0">
                {t('question_what_languages_technologies')}
            </h3>
            <h5 className="font-size-14">
                {t('question_tags_help_the_right_people')}
            </h5>
            <div className="module p4 width-100">
                <p className="font-weight-700">
                    {t('question_identify_your_tags')}
                </p>
                <p>{t('common_for_exemple')}:</p>
                <p className="m0">
                    <span>
                        <i className="fas fa-check" />{' '}
                        {t('question_include_tags_that')}
                    </span>
                    <br />
                    <span>
                        <i className="fas fa-times" />{' '}
                        {t('question_only_included_in')}
                    </span>
                </p>
            </div>

            <div className="mt3">
                <p className="font-weight-700 mb2">{t('common_tags')}</p>
                <div className="tagcloud">
                    <div className="question-tags">
                        {tags
                            .filter(t => tagIds.includes(t.id))
                            .map((tag, index) => {
                                return (
                                    <button
                                        key={index}
                                        className="module"
                                        onClick={() => onRemoveTag(tag.id)}
                                    >
                                        {tag.nameEn}{' '}
                                        <i className="fas fa-times" />
                                    </button>
                                );
                            })}
                    </div>
                </div>
                <Autocomplete
                    suggestions={tags.filter(tag => !tagIds.includes(tag.id))}
                    filterBy="nameEn"
                    onSelected={onSelectTag}
                />
            </div>
            <div className="mt3 text-right">
                <button className="btn btn-light mr3" onClick={previous}>
                    {t('common_previous_step')}
                </button>
                <button className="btn btn-primary" onClick={next}>
                    {t('common_next')}
                </button>
            </div>
        </section>
    );
};

export default TagsQuestion;
