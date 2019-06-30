import React from 'react';
import BasicComponent from "../../../common/abstract/component/BasicComponent";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const propTypes = {
    getSubCategories: PropTypes.func.isRequired,
};

export default class SubCategory extends BasicComponent {
    constructor(props) {
        super(props);
        this.state = {
            subCategories: [],
        };
        props.getSubCategories(this);
    }
    render() {
        const { subCategories } = this.state;
        return (
            <div className="discy-main-inner float_l">
                <div className="breadcrumbs">
                    <span className="crumbs">
                        <span>
                            <a href="https://2code.info/demo/themes/Discy/Main/">
                                <i className="icon-home"/>
                                Home
                            </a>
                            <span>
                                <span className="crumbs-span"> / </span>
                                <span className="current">Tags</span>
                            </span>
                        </span>
                    </span>
                    <div className="breadcrumb-right">
                        <div className="search-form">
                            <form method="get" className="search-filter-form">
                                <span className="styled-select tag-filter">
                                    <select name="tag_filter">
                                        <option>Popular</option>
                                        <option>Followers</option>
                                        <option>Name</option>
                                    </select>
                                </span>
                            </form>
                            <form method="get" action="https://2code.info/demo/themes/Discy/Main/search/" className="search-input-form main-search-form">
                                <input className="search-input live-search live-search-icon" autoComplete="off"
                                       type="search" name="search" placeholder="Type to find..."/>
                                <div className="loader_2 search_loader"></div>
                                <div className="search-results results-empty"></div>
                                <button className="button-search"><i className="icon-search"/></button>
                                <input type="hidden" name="search_type" className="search_type" value="question_tags"/>
                            </form>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
                <div className="clearfix"></div>
                <section>
                    <article id="post-32"
                             className="article-post article-post-only clearfix post-32 page type-page status-publish hentry"
                             itemScope="" itemType="https://schema.org/Article">
                        <div className="single-inner-content">
                            <header className="article-header header-no-author header-no-meta">
                                <figure className="featured-image post-img post-img-0"></figure>
                            </header>
                            <div className="post-wrap-content">
                                <div className="post-content-text"></div>
                                <div className="row cats-sections tags-sections">
                                    {
                                        subCategories.map((category: SubCategory, index) => {
                                            return (
                                                <div key={index} className="col col6">
                                                    <div className="cat-sections-follow">
                                                        <div className="cat-sections">
                                                            <Link to="/"><i className="icon-tag"/>{category.nameEn}</Link>
                                                        </div>
                                                        <div className="cat-section-follow">
                                                            <div className="cat-follow-button">
                                                                <i className="icon-users"/>
                                                                <span className="follow-cat-count"> {category.numberOfQuestions}</span>
                                                                questions
                                                            </div>
                                                            <div className="clearfix"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })

                                    }

                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        )
    }
}
SubCategory.propTypes = propTypes;
