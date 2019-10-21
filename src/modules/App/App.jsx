import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './AppRouter';
import Header from './Header';
import { SweetAlert } from '../../component/SweetAlert';
import { MobileAside } from '../MobileAside';
import { ContactUs } from '../ContactUs';

import { Authentification } from '../Authentification';

import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../configureStore';

import { fetchUserFromCookieFn } from '../../actions/app';

const App = ({ App, uppdateAuthenticate, fetchUserFromCookie }) => {
    React.useEffect(() => {
        fetchUserFromCookie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { isVerifiedUser, isAuthenticated } = App;

    if (!isVerifiedUser) {
        return <div />;
    }

    const classWrapper = isAuthenticated ? 'wrap-login' : 'wrap-not-login';

    return (
        <ConnectedRouter history={history}>
            <Router>
                <Authentification />
                <ContactUs />
                <SweetAlert />
                <div id="wrap" className={classWrapper}>
                    <Header />
                    <MobileAside />
                    <AppRouter />
                </div>
            </Router>
        </ConnectedRouter>
    );
};

// Retrieve data from store as props
const mapStateToProps = ({ App }) => ({
    App
});

const mapDispatchToProps = dispatch => ({
    fetchUserFromCookie: () => dispatch(fetchUserFromCookieFn(true))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
