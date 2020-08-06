import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getTags } from '../../services/tags.service';
import { getNameByLanguage } from '../../utils/multiple-language';

const SubCategory = () => {
    const { t } = useTranslation();

    const [tags, setTags] = React.useState([]);

    React.useEffect(() => {
        getTags()
            .then(data => {
                setTags(data);
            })
            .catch(err => console.log(err.message));
    }, []);

    return (
        <div className="discy-main-inner float_l">
            <div className="breadcrumbs">
                <span className="crumbs">
                    <span>
                        <a href="/">
                            <i className="icon-home" />
                            {t('common_home')}
                        </a>
                        <span>
                            <span className="crumbs-span"> / </span>
                            <span className="current">{t('common_tags')}</span>
                        </span>
                    </span>
                </span>
                <div className="breadcrumb-right">
                    <div className="search-form">
                        <form method="get" className="search-filter-form">
                            <span className="styled-select tag-filter">
                                <select name="tag_filter">
                                    <option>{t('common_popular')}</option>
                                    <option>{t('common_followers')}</option>
                                    <option>{t('common_name')}</option>
                                </select>
                            </span>
                        </form>
                        <form
                            method="get"
                            action="/"
                            className="search-input-form main-search-form"
                        >
                            <input
                                className="search-input live-search live-search-icon"
                                autoComplete="off"
                                type="search"
                                name="search"
                                placeholder="Type to find..."
                            />
                            <div className="loader_2 search_loader" />
                            <div className="search-results results-empty" />
                            <button className="button-search">
                                <i className="icon-search" />
                            </button>
                            <input
                                type="hidden"
                                name="search_type"
                                className="search_type"
                                value="question_tags"
                            />
                        </form>
                    </div>
                    <div className="clearfix" />
                </div>
            </div>
            <div className="clearfix" />
            <section>
                <article
                    id="post-32"
                    className="article-post article-post-only clearfix post-32 page type-page status-publish hentry"
                    itemScope=""
                    itemType="https://schema.org/Article"
                >
                    <div className="single-inner-content">
                        <header className="article-header header-no-author header-no-meta">
                            <figure className="featured-image post-img post-img-0" />
                        </header>
                        <div className="post-wrap-content">
                            <div className="post-content-text" />
                            <div className="row cats-sections tags-sections">
                                {tags.map((item, index) => (
                                    <div key={item.id} className="col col6">
                                        <div className="cat-sections-follow">
                                            <div className="cat-sections">
                                                <Link
                                                    to={`/topics?page=1&tags=${item.id}`}
                                                >
                                                    <i className="icon-tag" />
                                                    {getNameByLanguage(item)}
                                                </Link>
                                            </div>
                                            <div className="cat-section-follow">
                                                <div className="cat-follow-button">
                                                    <i className="icon-users" />
                                                    <span className="follow-cat-count">
                                                        {item.questionCount}
                                                    </span>
                                                    {t('common_questions')}
                                                </div>
                                                <div className="clearfix" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
};

export default SubCategory;
