import React from 'react';
import { connect } from 'react-redux';

import SweetAlertUI from 'sweetalert-react';
import BasicComponent from '../../common/abstract/component/BasicComponent';
import { showAlert, hideAlert } from '../../actions/sweetAlert';

import { SweetAlertType } from '../../constants/sweet-alert.constant';

interface MySweetAlertProps {
    alertInfo: SweetAlertType;
}

const MySweetAlert = ({ alertInfo }: MySweetAlertProps) => (
    <SweetAlertUI {...alertInfo} />
);

const mapStateToProps = ({ AlertState }) => ({
    alertInfo: AlertState,
});

export default connect(mapStateToProps)(MySweetAlert);
