import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import { showLoginConfirmFn } from '../actions/alertConfirm';

const AskButton = ({
    label,
    toLink = '/add-question',
    history,
    isAuthenticated,
    showLoginConfirm
}) => {
    const onClick = () => {
        if (!isAuthenticated) {
            return showLoginConfirm();
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
    showLoginConfirm: () => dispatch(showLoginConfirmFn())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AskButton));
