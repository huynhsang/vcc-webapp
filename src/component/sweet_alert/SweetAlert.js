import React from 'react';
import { connect } from 'react-redux';

import SweetAlertUI from 'sweetalert-react';
import { hideAlertAction } from '../../actions/sweetAlert';

const MySweetAlert = ({ alertInfo, hideAlert }) => {

    const onConfirm = alertInfo.onConfirm || hideAlert;

    return <SweetAlertUI {...{...alertInfo, onConfirm, onCancel:hideAlert}} />;
};

const mapStateToProps = ({ AlertState }) => ({
    alertInfo: AlertState,
});

const mapDispatchToProps = dispatch => ({
    hideAlert: () => dispatch(hideAlertAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MySweetAlert);
