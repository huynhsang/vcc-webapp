import React from 'react';
import { useTranslation } from 'react-i18next';

const ForgotPassword = ({ setToLogin }) => {
    const { t } = useTranslation();

    return (
        <div className="p10 pl3 pr3">
            <div className="forgot-page box-shadow text-color-white">
                <h3 className="text-center">
                    <i className="fa fa-lock fa-4x" />
                </h3>
                <p className="text-center">
                    {t('authentification_enter_your_email')}
                </p>
                <form>
                    <input
                        id="emailInput"
                        placeholder="Email address"
                        type="email"
                    />
                    <button className="btn btn-primary width-100 mb3">
                        {t('authentification_reset_password')}
                    </button>
                    <a
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
