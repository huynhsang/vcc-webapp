import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { DefaultWrapper } from '../../component/Wrappers';

import MainMenu from './MainMenu';

import {
    setIsAuthenticatedFn,
    setToLoginFn,
    setToRegistreFn,
    toggleMobileAsideFn,
    toggleContactUsFn
} from '../../actions/app';

import VCNCLogo from '../../images/VCNC-logo.png';

import UserBox from './UserBox';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(() => ({
    iconButton: {
        color: 'white',
        '&:hover': {
            backgroundColor: '#1a1c21'
        },
        display: 'none',
        '@media (max-width: 768px)': {
            display: 'block'
        }
    }
}));

const HeaderWrapper = styled.header`
    background: rgba(0, 0, 0, 1);
`;

const ContentWrapper = styled(DefaultWrapper)`
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled.img`
    width: 60px;
    cursor: pointer;
`;

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
    const classes = useStyles();

    const { isAuthenticated, currentUser } = App;

    const redirect = url => () => {
        history.push(url);
    };

    return (
        <HeaderWrapper>
            <ContentWrapper>
                <IconButton
                    className={classes.iconButton}
                    onClick={() => toggleMobileAside(true)}
                >
                    <MenuIcon />
                </IconButton>
                <FlexWrapper>
                    <Logo
                        title="VC&C"
                        alt="VC&C Logo"
                        src={VCNCLogo}
                        onClick={redirect('/')}
                    />
                    <MainMenu
                        toggleContactUs={toggleContactUs}
                        location={location}
                        history={history}
                    />
                </FlexWrapper>
                <UserBox
                    isAuthenticated={isAuthenticated}
                    currentUser={currentUser}
                    setIsAuthenticated={setIsAuthenticated}
                    setToLogin={setToLogin}
                    setToRegistre={setToRegistre}
                />
            </ContentWrapper>
        </HeaderWrapper>
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