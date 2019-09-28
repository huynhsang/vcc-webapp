import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './AppRouter';
import Header from './Header';
import RootScope from '../../global/RootScope';
import CookieHelper from '../../common/util/CookieHelper';
import CookieConstant from '../../common/constant/CookieConstant';
import { SweetAlert } from '../../component/SweetAlert';
import MobileAside from './MobileAside';

import { Authentification } from '../Authentification';

import {
    getCurrentUser,
    updateApplicationAfterAuthenticated
} from '../../common/util/AccountUtil';

import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../configureStore';

const App = ({ auth, uppdateAuthenticate }) => {
    React.useEffect(() => {
        RootScope.token = CookieHelper.getCookie(CookieConstant.jwtTokenName);
        RootScope.userId = Number(
            CookieHelper.getCookie(CookieConstant.userIdKey)
        );
        if (RootScope.token && RootScope.userId) {
            getCurrentUser().then(() => {
                uppdateAuthenticate();
            });
        }
    }, []);

    const classWrapper: string = auth.isAuthenticated
        ? 'wrap-login'
        : 'wrap-not-login';
    return (
        <ConnectedRouter history={history}>
            <Router>
                <Authentification />
                <SweetAlert />
                <div id="wrap" className={classWrapper}>
                    <Header />
                    <MobileAside />
                    <AppRouter auth={auth} />
                </div>
            </Router>
        </ConnectedRouter>
    );
};

// Retrieve data from store as props
const mapStateToProps = ({ AppAuth }) => ({
    auth: AppAuth
});

const mapDispatchToProps = dispatch => ({
    uppdateAuthenticate: () => dispatch(updateApplicationAfterAuthenticated())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
