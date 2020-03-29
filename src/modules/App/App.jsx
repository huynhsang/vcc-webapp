import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './AppRouter';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { LoginConfirmModal } from '../LoginConfirmModal';
import { MobileAside } from '../MobileAside';
import { ContactUs } from '../ContactUs';
import { CustomizedSnackbars } from '../CustomizedSnackbars';

import { CookieBanner } from '../CookieBanner';
import { Authentification } from '../Authentification';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../configureStore';

import { fetchUserFromCookieFn } from '../../actions/app';
import { withTranslation } from 'react-i18next';
import { runCrisp, setCrispUserInfos } from '../../utils/run-crisp';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

let muiTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#035290'
        },
        secondary: {
            main: '#bc0e0e'
        }
    }
});

const App = ({ App, fetchUserFromCookie }) => {
    React.useEffect(() => {
        runCrisp();
        fetchUserFromCookie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { isVerifiedUser, currentUser } = App;

    React.useEffect(() => {
        setCrispUserInfos(currentUser);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    if (!isVerifiedUser) {
        return <div />;
    }

    return (
        <ConnectedRouter history={history}>
            <Router>
                <ThemeProvider theme={muiTheme}>
                    <Authentification />
                    <ContactUs />
                    <LoginConfirmModal />
                    <CustomizedSnackbars />
                    <CookieBanner />
                    <AppWrapper>
                        <MobileAside />
                        <Header />
                        <AppRouter />
                        <Footer />
                    </AppWrapper>
                </ThemeProvider>
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
)(withTranslation()(App));
