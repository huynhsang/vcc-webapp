import React from 'react';
import { connect } from 'react-redux';

import SweetAlertUI from 'sweetalert-react';
import BasicComponent from '../../common/abstract/component/BasicComponent';
import { hideAlertAction } from '../../actions/sweetAlert';

import { SweetAlertType } from '../../constants/sweet-alert.constant';

const MySweetAlert = ({ alertInfo, hideAlert }) => {

    const onConfirm = alertInfo.onConfirm || hideAlert;

    return <SweetAlertUI {...{...alertInfo, onConfirm, onCancel:onConfirm}} />;
};

const mapStateToProps = ({ AlertState }) => ({
    alertInfo: AlertState,
});

const mapDispatchToProps = dispatch => ({
    hideAlert: () => dispatch(hideAlertAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MySweetAlert);
