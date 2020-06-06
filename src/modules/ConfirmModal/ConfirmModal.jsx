import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ErrorOutline from '@material-ui/icons/ErrorOutline';

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

const ConfirmModal = ({ isOpen, title, description, cancel, action }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const handleClose = () => {
        cancel();
    };

    const handleConfirm = () => {
        action();
        cancel();
    };

    return (
        <Dialog className={classes.dialog} open={isOpen} onClose={handleClose}>
            <DialogTitle className={classes.dialogTitle}>
                <ErrorOutlineIcon />
                <div>{title}</div>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText>{description}</DialogContentText>
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

export default ConfirmModal;
