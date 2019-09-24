import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Result from '../../global/Result';
import CoreService from '../../global/CoreService';

import { useTranslation } from 'react-i18next';
import { HomeLayout } from '../HomeLayout';

const { subCategoryService } = CoreService;

const SubCategory = ({ getSubCategories }) => {
    const { t } = useTranslation();

    const [subCategories, setSubCategories] = React.useState([]);

    React.useEffect(() => {
        subCategoryService.findAll({}).then((result: Result) => {
            if (result.success) {
                setSubCategories(result.data);
            } else {
                // Todo: handle error here
            }
        });
    }, []);

    return (
        <HomeLayout>
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
                                <span className="current">
                                    {t('common_tags')}
                                </span>
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
                                    {subCategories.map(
                                        (item: SubCategory, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="col col6"
                                                >
                                                    <div className="cat-sections-follow">
                                                        <div className="cat-sections">
                                                            <Link to="/">
                                                                <i className="icon-tag" />
                                                                {item.nameEn}
                                                            </Link>
                                                        </div>
                                                        <div className="cat-section-follow">
                                                            <div className="cat-follow-button">
                                                                <i className="icon-users" />
                                                                <span className="follow-cat-count">
                                                                    {' '}
                                                                    {
                                                                        item.amount
                                                                    }
                                                                </span>
                                                                questions
                                                            </div>
                                                            <div className="clearfix" />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </HomeLayout>
    );
};

SubCategory.propTypes = {
    getSubCategories: PropTypes.func.isRequired
};

export default SubCategory;
