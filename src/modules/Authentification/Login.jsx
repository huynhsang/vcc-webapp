import React from 'react';
import LoginRequestBuilder from '../../global/LoginRequest';
import { useTranslation } from 'react-i18next';
import RootScope from '../../global/RootScope';

import { login } from '../../services/account.service';

const Login = ({
    history,
    showSuccessAlert,
    showErrorAlert,
    setToFindPassword,
    setToRegistre,
    hideAuthentification,
    fetchUserFromCookie
}) => {
    const { t } = useTranslation();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false);

    const onSubmit = event => {
        event.preventDefault();
        const data = LoginRequestBuilder.build(email, password, rememberMe);

        login(data)
            .then(data => {
                showSuccessAlert('Success!', 'Logged in');
                fetchUserFromCookie();
                history.push('/home/questions');
            })
            .catch(err => {
                RootScope.resetAuthValues();
                showErrorAlert(err.response.data.error.message);
            });
    };

    return (
        <div className="login-page">
            <div className="card box-shadow">
                <div
                    className="position-relative"
                    style={{ marginBottom: '15px' }}
                >
                    <div className="social_icon">
                        <span>
                            <i className="fab fa-facebook-square" />
                        </span>
                        <span>
                            <i className="fab fa-google-plus-square" />
                        </span>
                        <span>
                            <i className="fab fa-twitter-square" />
                        </span>
                    </div>
                </div>
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group-login flex-center mb2">
                            <div className="input-group-prepend flex-center">
                                <span className="text-color-white">
                                    <i className="fa fa-user" />
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder={t('common_email')}
                                value={email}
                                onChange={ev => setEmail(ev.target.value)}
                            />
                        </div>
                        <div className="form-group-login flex-center mb2">
                            <div className="input-group-prepend flex-center">
                                <span className="text-color-white">
                                    <i className="fa fa-key" />
                                </span>
                            </div>
                            <input
                                type="password"
                                placeholder={t('common_password')}
                                value={password}
                                onChange={ev => setPassword(ev.target.value)}
                            />
                        </div>
                        <div className="remember text-color-white display-flex align-items-center">
                            <input
                                type="checkbox"
                                id="checkbox1"
                                value={rememberMe}
                                onChange={ev =>
                                    setRememberMe(ev.target.checked)
                                }
                            />
                            <label htmlFor="checkbox1">
                                {t('authentification_remember_me')}
                            </label>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="btn btn-primary">
                                {t('common_login')}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="text-center">
                        {`${t('authentification_donot_have_account')} `}
                        <a //eslint-disable-line jsx-a11y/anchor-is-valid
                            onClick={setToRegistre}
                            className="ml-1 text-color-white"
                        >
                            {t('authentification_sign_up')}
                        </a>
                    </div>
                    <div className="text-center">
                        <a //eslint-disable-line jsx-a11y/anchor-is-valid
                            onClick={setToFindPassword}
                            className="text-color-white"
                        >
                            {t('authentification_forgot_your_password')}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
