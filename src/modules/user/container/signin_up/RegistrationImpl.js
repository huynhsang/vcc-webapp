import { connect } from 'react-redux';
import Registration from '../../component/signin_up/Registration';
import AccountJWTService from '../../service/AccountJWTService';
import Result from '../../../../global/Result';
import { RegisterRequest } from '../../request/RegisterRequest';
import ApplicationUtil from '../../../../common/util/ApplicationUtil';

import { showSuccessAlertFn } from '../../../../actions/sweetAlert';

/**
 * The method handles to register new account
 * @param registerData: {RegisterRequest} The register request
 * @param redirect: {any} The router redirect
 * @return {function(): *}
 */
function doRegister(registerData: RegisterRequest, redirect: any): void {
    return dispatch => {
        return AccountJWTService.createAccount(registerData).then(
            (result: Result) => {
                if (result.isSuccess()) {
                    dispatch(
                        showSuccessAlertFn(
                            'Success!',
                            'Check your email to complete the registration!'
                        )
                    );
                    redirect.push('/login');
                } else {
                    dispatch(
                        showSuccessAlertFn(
                            'Error!',
                            ApplicationUtil.getErrorMsg(result.data)
                        )
                    );
                }
            }
        );
    };
}

const mapDispatchToProps = dispatch => ({
    doRegister: (registerData, redirect) =>
        dispatch(doRegister(registerData, redirect)),
});

const RegistrationImpl = connect(
    null,
    mapDispatchToProps
)(Registration);
export default RegistrationImpl;
