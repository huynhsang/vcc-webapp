import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SweetAlertUI from 'sweetalert-react';
import { hideAlertAction } from '../../actions/sweetAlert';
import { setToLoginFn } from '../../actions/app';

import { SweetAlertType } from '../../constants/sweet-alert.constant';

import { TO_LOGIN } from './confirm-name.constant';

const sweetAlertDefault: SweetAlertType = {
    show: false,
    title: '',
    type: null,
    text: null,
    showCancelButton: false,
    confirmButtonText: '',
    cancelButtonText: '',
    onConfirm: null,
    onCancel: null
};

const MySweetAlert = ({ alertInfo, hideAlert, setToLogin, history }) => {
    const onConfirm =
        alertInfo.confirmName === TO_LOGIN ? setToLogin : () => {};

    const sweetAlertProps = {
        ...sweetAlertDefault,
        ...alertInfo,
        onConfirm: () => {
            onConfirm();
            hideAlert();
        },
        onCancel: hideAlert
    };

    return <SweetAlertUI {...sweetAlertProps} />;
};

const mapStateToProps = ({ alertState }) => ({
    alertInfo: alertState
});

const mapDispatchToProps = dispatch => ({
    hideAlert: () => dispatch(hideAlertAction()),
    setToLogin: () => dispatch(setToLoginFn())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MySweetAlert));
