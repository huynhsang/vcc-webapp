import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { showAlertFn } from '../../actions/alertConfirm';

const CustomizedSnackbars = ({ alert, showAlert }) => {
    const {
        severity = 'success',
        title,
        open = false,
        vertical,
        horizontal
    } = alert;

    const handleClose = () => {
        showAlert({ ...alert, open: false });
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <MuiAlert
                elevation={3}
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
