import React from 'react';
import { useTranslation } from 'react-i18next';
import RootScope from '../../global/RootScope';

import AccountJWTService from '../../services/accountJWT.service';

const ForgotPassword = ({
    setToLogin,
    history,
    updateAuthenticated,
    showSuccessAlert,
    showErrorAlert,
    hideAuthentification
}) => {
    const { t } = useTranslation();

    const [email, setEmail] = React.useState('');

    const onSubmit = event => {
        event.preventDefault();
        AccountJWTService.doResetPassword({ email }).then((result: Result) => {
            if (result.isSuccess()) {
                hideAuthentification();
                showSuccessAlert(
                    'Success!',
                    t('forgot_password_please_verify_your_email')
                );
            } else {
                RootScope.resetAuthValues();
                showErrorAlert(result.data);
            }
        });
    };

    return (
        <div className="p10 pl3 pr3">
            <div className="forgot-page box-shadow text-color-white">
                <h3 className="text-center">
                    <i className="fa fa-lock fa-4x" />
                </h3>
                <p className="text-center">
                    {t('authentification_enter_your_email')}
                </p>
                <form onSubmit={onSubmit}>
                    <input
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                        type="email"
                    />
                    <button
                        className="btn btn-primary width-100 mb3"
                        id="submit"
                    >
                        {t('authentification_reset_password')}
                    </button>
                    <a //eslint-disable-line jsx-a11y/anchor-is-valid
                        onClick={setToLogin}
                        className="text-left text-color-white"
                    >
                        <i className="fas fa-arrow-left" />
                        {` ${t('authentification_back_to_login')}`}
                    </a>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
