import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import { showConfirmToLoginFn } from '../actions/sweetAlert';

const AskButton = ({
    label,
    toLink = '/add-question',
    history,
    isAuthenticated,
    showConfirmToLogin
}) => {
    const onClick = () => {
        if (!isAuthenticated) {
            return showConfirmToLogin();
        }

        history.push(toLink);
    };

    return (
        <Button
            variant="contained"
            onClick={onClick}
            color="secondary"
            size="small"
        >
            {label}
        </Button>
    );
};

const mapStateToProps = ({ App: { isAuthenticated } }) => ({
    isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    showConfirmToLogin: () => dispatch(showConfirmToLoginFn())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AskButton));
