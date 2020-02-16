import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './AppRouter';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { SweetAlert } from '../../component/SweetAlert';
import { MobileAside } from '../MobileAside';
import { ContactUs } from '../ContactUs';

import { Authentification } from '../Authentification';

import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../configureStore';

import { fetchUserFromCookieFn } from '../../actions/app';

const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const App = ({ App, fetchUserFromCookie }) => {
    React.useEffect(() => {
        fetchUserFromCookie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { isVerifiedUser } = App;

    if (!isVerifiedUser) {
        return <div />;
    }
const { REACT_APP_SOCIAL_LOGIN_API_URL } = process.env;
console.log('TESTT 2: ', REACT_APP_SOCIAL_LOGIN_API_URL);

    return (
        <ConnectedRouter history={history}>
            <Router>
                <Authentification />
                <ContactUs />
                <SweetAlert />
                <AppWrapper>
                    <MobileAside />
                    <Header />
                    <AppRouter />
                    <Footer />
                </AppWrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
