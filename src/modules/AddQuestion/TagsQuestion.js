import React from 'react';
import { useTranslation } from 'react-i18next';

import Autocomplete from '../../component/autocomplete/AutoComplete';
import PropTypes from 'prop-types';
import { SubCategory } from '../../domain/SubCategory';
import CoreService from '../../global/CoreService';

const { subCategoryService } = CoreService;

const TagsQuestion = ({ category, selectedTags, next, previous }) => {
    const { t } = useTranslation();

    const [tagsEditted, setTagsEditted] = React.useState(selectedTags || []);
    const [suggestions, setSuggestion] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        subCategoryService
            .getSubCategoriesByCategory(category)
            .then((result: Result) => {
                if (result.success) {
                    setSuggestion(result.data);
                } else {
                    // Todo: handle error here
                }
                setIsLoading(false);
            });
    }, [category]);

    const onSelectTag = (tag: SubCategory) => {
        setTagsEditted(state => [...state, tag]);
        setSuggestion(state => state.filter(val => val.id !== tag.id));
    };

    const onRemoveTag = (tag: SubCategory) => {
        setSuggestion(state => [...state, tag]);
        setTagsEditted(state => state.filter(val => val.id !== tag.id));
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

            {!isLoading && (
                <>
                    <div className="mt3">
                        <p className="font-weight-700 mb2">
                            {t('common_tags')}
                        </p>
                        <div className="tagcloud">
                            <div className="question-tags">
                                {tagsEditted.map((tag, index) => {
                                    return (
                                        <button
                                            key={index}
                                            className="module"
                                            onClick={() => onRemoveTag(tag)}
                                        >
                                            {tag.nameEn}{' '}
                                            <i className="fas fa-times" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <Autocomplete
                            suggestions={suggestions}
                            filterBy="nameEn"
                            onSelected={onSelectTag}
                        />
                    </div>
                    <div className="mt3 text-right">
                        <button
                            className="btn btn-light mr3"
                            onClick={() => previous('Type')}
                        >
                            {t('common_previous_step')}
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => next(tagsEditted)}
                        >
                            {t('common_next')}
                        </button>
                    </div>
                </>
            )}
        </section>
    );
};

TagsQuestion.propTypes = {
    next: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
    selectedTags: PropTypes.array.isRequired,
};

export default TagsQuestion;
