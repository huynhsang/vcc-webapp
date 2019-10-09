import React from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

const MobileBar = () => {
    const { t } = useTranslation();
    const [showSearch, setShowSearch] = React.useState(false);
    const searchInput = showSearch ? { display: 'block' } : { display: 'none' };
    const buttonSearch = showSearch
        ? { display: 'none' }
        : { display: 'block' };
    return (
        <div className="mobile-bar">
            <div className="discy-container">
                <div className="mobile-bar-content">
                    <div className="discy-container">
                        <div className="mobile-bar-search">
                            <Link
                                style={buttonSearch}
                                to="/"
                                onClick={() => setShowSearch(state => !state)}
                            >
                                <i className="icon-search" />
                                Search
                            </Link>
                            <form
                                style={searchInput}
                                role="search"
                                method="get"
                                className="searchform main-search-form"
                                action="/"
                            >
                                <i
                                    className="icon-left-open"
                                    onClick={() =>
                                        setShowSearch(state => !state)
                                    }
                                />
                                <input
                                    type="search"
                                    className="live-search"
                                    autoComplete="off"
                                    name="search"
                                    placeholder="Hit enter to search"
                                />
                                <div className="loader_2 search_loader" />
                                <div className="search-results results-empty" />
                                <input
                                    type="hidden"
                                    name="search_type"
                                    className="search_type"
                                    value="questions"
                                />
                            </form>
                        </div>
                        <div className="mobile-bar-ask">
                            <Link to="/add-question" className="wpqa-question">
                                <i className="icon-help-circled" />
                                {t('home_ask_a_question')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileBar;
