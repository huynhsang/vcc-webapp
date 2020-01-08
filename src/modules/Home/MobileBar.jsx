import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import qs from 'qs';

import { Link } from 'react-router-dom';

const SearchWrapper = styled.div`
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: ${p => (p.show ? 'block' : 'none')};

    & i {
        font-size: 14px;
        padding: 0 10px;
        cursor: pointer;
    }
`;

const MobileBar = ({ history, location }) => {
    const { t } = useTranslation();
    const [showSearch, setShowSearch] = React.useState(false);

    const { show, text, tags } = qs.parse(location.search.substr(1));

    const [searchText, setSearchText] = React.useState(text || '');

    const search = (inputText = searchText) => {
        const { pathname } = location;
        const params = { page: 1, text: inputText };
        if (/home\/questions/.test(pathname)) {
            Object.assign(params, { show, tags });
        }
        const url = `/homes/questions?${qs.stringify(params)}`;
        history.push(url);
    };

    const onkeyPress = ev => {
        if (ev.which === 13) {
            search();
        }
    };

    const hideSearch = () => {
        setShowSearch(false);
        setSearchText('');
        search('');
    };

    return (
        <div className="mobile-bar">
            <div className="discy-container">
                <div className="mobile-bar-content">
                    <div className="discy-container">
                        <div className="mobile-bar-search">
                            <a //eslint-disable-line jsx-a11y/anchor-is-valid
                                style={{
                                    display: showSearch ? 'none' : 'block'
                                }}
                                onClick={() => setShowSearch(state => !state)}
                            >
                                <i className="icon-search" />
                                {t('question_search_question')}
                            </a>
                            <SearchWrapper show={showSearch}>
                                <i
                                    className="icon-left-open"
                                    onClick={hideSearch}
                                />
                                <input
                                    type="search"
                                    name="search"
                                    placeholder={t(
                                        'question_hit_enter_to_search'
                                    )}
                                    value={searchText}
                                    onChange={ev =>
                                        setSearchText(ev.target.value)
                                    }
                                    onKeyUp={onkeyPress}
                                />
                                <div className="loader_2 search_loader" />
                                <div className="search-results results-empty" />
                                <input
                                    type="hidden"
                                    name="search_type"
                                    className="search_type"
                                    value="questions"
                                />
                            </SearchWrapper>
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

export default withRouter(MobileBar);
