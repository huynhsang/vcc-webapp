import React from 'react';
import PropTypes from 'prop-types';
import SweetAlertUI from 'sweetalert-react';
import BasicComponent from "../../common/abstract/component/BasicComponent";
import SweetAlert from "../../global/SweetAlert";

const propTypes = {
	alertInfo: PropTypes.object.isRequired,
	show: PropTypes.func.isRequired,
	hide: PropTypes.func.isRequired,
};
export default class MySweetAlert extends BasicComponent {
    handleBeforeTheFirstRender(): void {
        SweetAlert.show = this.props.show;
        SweetAlert.hide = this.props.hide;
    }
    render() {
        return(
            <SweetAlertUI {...this.props.alertInfo}/>
        )
    }
}
MySweetAlert.propTypes = propTypes;
