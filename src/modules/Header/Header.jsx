import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';

import qs from 'qs';

import logo from '../../static/resources/img/logo/logo.png';
import logo2x from '../../static/resources/img/logo/logo-2x.png';
import { LanguageSelector } from '../LanguageSelector';

import MainMenu from './MainMenu';

import {
    setIsAuthenticatedFn,
    setToLoginFn,
    setToRegistreFn,
    toggleMobileAsideFn,
    toggleContactUsFn
} from '../../actions/app';

import Authenticate from './Authenticate';

const Header = ({
    App,
    setIsAuthenticated,
    location,
    setToLogin,
    setToRegistre,
    history,
    toggleMobileAside,
    toggleContactUs
}) => {
    const { t } = useTranslation();
    const { isAuthenticated, currentUser } = App;

    const { show, text } = qs.parse(location.search.substr(1));

    const [searchText, setSearchText] = React.useState(text);

    const search = () => {
        const { pathname } = location;
        const params = { page: 1, text: searchText };
        if (/home\/questions/.test(pathname)) {
            params.show = { show };
        }
        const url = `/home/questions?${qs.stringify(params)}`;
        history.push(url);
    };

    const onkeyPress = (ev) => {
        if (ev.which === 13) {
            search();
        }
    };

    return (
        <div className="hidden-header header-dark mobile_bar_active">
            <header className="header">
                <div className="discy-container">
                    <div className="mobile-menu">
                        <div
                            className="mobile-menu-click"
                            onClick={() => toggleMobileAside(true)}
                        >
                            <i className="icon-menu" />
                        </div>
                    </div>
                    <Authenticate
                        isAuthenticated={isAuthenticated}
                        currentUser={currentUser}
                        setIsAuthenticated={setIsAuthenticated}
                        setToLogin={setToLogin}
                        setToRegistre={setToRegistre}
                    />
                    <div className="left-header float_l">
                        <h2 className="screen-reader-text site_logo">VC&C</h2>
                        <Link
                            className="logo float_l logo-img"
                            to="/"
                            title="Home"
                        >
                            <img
                                title="VC&C"
                                width="60"
                                className="default_screen"
                                alt="VC&C Logo"
                                src={logo}
                            />
                            <img
                                title="VC&C"
                                width="60"
                                className="retina_screen"
                                alt="VC&C Logo"
                                src={logo2x}
                            />
                        </Link>
                        <div className="mid-header float_l">
                            <div className="header-language-selector">
                                <LanguageSelector />
                            </div>
                            <div className="header-search float_r">
                                <div className="search-wrapper">
                                    <input
                                        type="search"
                                        placeholder={t(
                                            'question_search_question'
                                        )}
                                        value={searchText}
                                        onChange={ev =>
                                            setSearchText(ev.target.value)
                                        }
                                        onKeyUp={onkeyPress}
                                    />
                                    <button type="submit" onClick={search}>
                                        <i className="icon-search" />
                                    </button>
                                </div>
                            </div>
                            <nav className="nav float_l main-menu">
                                <h3 className="screen-reader-text">
                                    VC&C Navigation
                                </h3>
                                <MainMenu
                                    toggleContactUs={toggleContactUs}
                                    location={location}
                                    history={history}
                                />
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

// Retrieve data from store as props
const mapStateToProps = ({ App }) => ({
    App
});

const mapDispatchToProps = dispatch => ({
    setIsAuthenticated: val => dispatch(setIsAuthenticatedFn(val)),
    setToLogin: () => dispatch(setToLoginFn()),
    setToRegistre: () => dispatch(setToRegistreFn()),
    toggleMobileAside: val => dispatch(toggleMobileAsideFn(val)),
    toggleContactUs: val => dispatch(toggleContactUsFn(val))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

/* <form
    role="search"
    className="searchform main-search-form"
    method="get"
    action="#"
>
    <div className="search-wrapper">
        <input
            type="search"
            className="live-search live-search-icon"
            autoComplete="off"
            placeholder="Type Search Words"
            name="search"
        />
        <div className="loader_2 search_loader" />
        <div className="search-results results-empty" />
        <input
            type="hidden"
            name="search_type"
            className="search_type"
        />
        <div className="search-click" />
        <button type="submit">
            <i className="icon-search" />
        </button>
    </div>
</form> */
