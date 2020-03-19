import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { showAlertFn } from '../../actions/alertConfirm';

const CustomizedSnackbars = ({ alert, showAlert }) => {
    const { severity = 'success', title, open = false } = alert;

    const handleClose = () => {
        showAlert({ open: false });
    };

    return (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                severity={severity}
            >
                {title}
            </MuiAlert>
        </Snackbar>
    );
};

const mapStateToProps = ({ alertConfirm: { alert } }) => ({
    alert
});

const mapDispatchToProps = dispatch => ({
    showAlert: val => dispatch(showAlertFn(val))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomizedSnackbars);
