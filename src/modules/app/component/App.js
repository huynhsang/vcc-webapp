import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './../router/component/AppRouter';
import Header from './header/Header';
import RootScope from '../../../global/RootScope';
import CookieHelper from '../../../common/util/CookieHelper';
import CookieConstant from '../../../common/constant/CookieConstant';
import { SweetAlert } from '../../../component/sweet_alert/';
import MobileAside from './aside/MobileAside';
import PropTypes from 'prop-types';

import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../../configureStore';

const propTypes = {
    verifyToken: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};
const App = ({ auth, verifyToken, logout }) => {
    React.useEffect(() => {
        RootScope.token = CookieHelper.getCookie(CookieConstant.jwtTokenName);
        RootScope.userId = Number(
            CookieHelper.getCookie(CookieConstant.userIdKey)
        );
        if (RootScope.token && RootScope.userId) {
            verifyToken();
        }
    }, []);

    const classWrapper: string = auth.isAuthenticated
        ? 'wrap-login'
        : 'wrap-not-login';
    return (
        <ConnectedRouter history={history}>
            <Router>
                <div id="wrap" className={classWrapper}>
                    <Header
                        isAuthenticated={auth.isAuthenticated}
                        doLogOut={logout}
                    />
                    <MobileAside />
                    <AppRouter auth={auth} />
                    <SweetAlert />
                </div>
            </Router>
        </ConnectedRouter>
    );
};
App.propTypes = propTypes;

export default App;
