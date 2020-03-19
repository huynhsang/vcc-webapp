import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ErrorOutline from '@material-ui/icons/ErrorOutline';

import { showLoginConfirmFn } from '../../actions/alertConfirm';
import { setToLoginFn } from '../../actions/app';

const useStyles = makeStyles(() => ({
    dialog: {
        '& .MuiDialog-paper': {
            minWidth: '330px'
        }
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogActions: {
        justifyContent: 'center',
        paddingBottom: '20px'
    }
}));

const ErrorOutlineIcon = styled(ErrorOutline)`
    font-size: 100px !important;
    color: #b5b5b5;
`;

const LoginConfirmModal = ({
    isShownConfirmLogin,
    showLoginConfirm,
    setToLogin
}) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const handleClose = () => {
        showLoginConfirm(false);
    };

    const handleConfirm = () => {
        showLoginConfirm(false);
        setToLogin(true);
    };

    return (
        <Dialog
            className={classes.dialog}
            open={isShownConfirmLogin}
            onClose={handleClose}
        >
            <DialogTitle className={classes.dialogTitle}>
                <ErrorOutlineIcon />
                <div>{t('common_login')}</div>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText>
                    {t('login_thank_to_login_to_continue')}
                </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button onClick={handleClose}>{t('common_cancel')}</Button>
                <Button
                    variant="contained"
                    onClick={handleConfirm}
                    color="primary"
                >
                    {t('common_ok')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = ({ alertConfirm: { isShownConfirmLogin } }) => ({
    isShownConfirmLogin
});

const mapDispatchToProps = dispatch => ({
    showLoginConfirm: val => dispatch(showLoginConfirmFn(val)),
    setToLogin: val => dispatch(setToLoginFn(val))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginConfirmModal);
