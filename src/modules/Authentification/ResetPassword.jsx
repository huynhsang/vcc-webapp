import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { showSuccessAlertFn, showErrorAlertFn } from '../../actions/sweetAlert';

import { setNewPassword } from '../../services/account.service';

const ResetPassword = ({
    location,
    history,
    showSuccessAlert,
    showErrorAlert
}) => {
    const { t } = useTranslation();

    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const onSubmit = event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            return showErrorAlert(
                'Error!',
                t('authentification_invalid_comfirm_password')
            );
        }

        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('accessToken');

        setNewPassword(token, password)
            .then(() => {
                showSuccessAlert(
                    'Success!',
                    t('authentification_your_password_has_been_reset')
                );
                history.push('/home/questions');
            })
            .catch(err => {
                showErrorAlert(
                    'Error!',
                    showErrorAlert(err.response.data.error.message)
                );
            });
    };

    return (
        <div className="bg-unauthenticated">
            <div className="p10 pl3 pr3">
                <div className="forgot-page box-shadow text-color-white">
                    <h2 className="text-center">
                        <i className="fa fa-lock fa-4x" />
                    </h2>
                    <h3 className="text-center">
                        {t('authentification_enter_new_password')}
                    </h3>
                    <form onSubmit={onSubmit}>
                        <div className="mb3">
                            <input
                                value={password}
                                placeholder={t('authentification_new_password')}
                                onChange={ev => setPassword(ev.target.value)}
                                type="password"
                            />
                        </div>
                        <div className="mb3">
                            <input
                                value={confirmPassword}
                                placeholder={t(
                                    'authentification_confirm_new_password'
                                )}
                                onChange={ev =>
                                    setConfirmPassword(ev.target.value)
                                }
                                type="password"
                            />
                        </div>
                        <button
                            className="btn btn-primary width-100 mb3"
                            id="submit"
                        >
                            {t('authentification_reset_password')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProp = dispatch => ({
    showSuccessAlert: (title, text) =>
        dispatch(showSuccessAlertFn(title, text)),
    showErrorAlert: (title, text) => dispatch(showErrorAlertFn(title, text))
});

export default connect(
    null,
    mapDispatchToProp
)(withRouter(ResetPassword));
