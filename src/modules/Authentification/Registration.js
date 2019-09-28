import React from 'react';
import { RegisterRequest } from '../../global/RegisterRequest';
import RegisterRequestBuilder from '../../global/RegisterRequest';
import { Link } from 'react-router-dom';
import AccountJWTService from '../../services/accountJWT.service';

import { useTranslation } from 'react-i18next';

const Registration = ({
    history,
    showSuccessAlert,
    showErrorAlert,
    setToLogin
}) => {
    const { t } = useTranslation();

    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');

    const onSubmit = event => {
        event.preventDefault();
        const registerRequest = RegisterRequestBuilder.build(
            password,
            email,
            firstName,
            lastName,
            null
        );
        AccountJWTService.createAccount(registerRequest).then(
            (result: Result) => {
                if (result.isSuccess()) {
                    showSuccessAlert(
                        'Success!',
                        'Check your email to complete the registration!'
                    );
                    history.push('/home');
                } else {
                    showErrorAlert(result.data);
                }
            }
        );
    };

    return (
        <form className="register" onSubmit={onSubmit} method="post">
            <div className="row mb3">
                <div className="col-6">
                    <label
                        htmlFor="Firstname"
                        className="floatLabel font-size-16"
                    >
                        {t('authentification_first_name')}
                    </label>
                    <input
                        id="firstname"
                        className="font-size-14"
                        name="First name"
                        type="text"
                        value={firstName}
                        onChange={ev => setFirstName(ev.target.value)}
                    />
                </div>
                <div className="col-6">
                    <label htmlFor="Lastname" className="font-size-16">
                        {t('authentification_last_name')}
                    </label>
                    <input
                        id="lastname"
                        className="font-size-14"
                        name="Last name"
                        type="text"
                        value={lastName}
                        onChange={ev => setLastName(ev.target.value)}
                    />
                </div>
            </div>
            <div className="mb3">
                <label htmlFor="Email" className="font-size-16">
                    {t('common_email')}
                </label>
                <input
                    id="Email"
                    className="font-size-14"
                    name="Email"
                    type="text"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}
                />
            </div>
            <div className="mb3">
                <label htmlFor="password" className="font-size-16">
                    {t('common_password')}
                </label>
                <input
                    id="password"
                    className="font-size-14"
                    name="password"
                    type="password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                />
                {/*<span className="text-white font-italic font-size-12">Enter a password longer than 8 characters</span>*/}
            </div>
            <div className="mb4">
                <label htmlFor="confirm_password" className="font-size-16">
                    {t('authentification_confirm_password')}
                </label>
                <input
                    id="confirm_password"
                    className="font-size-14"
                    name="confirm_password"
                    type="password"
                    value={confirmPassword}
                    onChange={ev => setConfirmPassword(ev.target.value)}
                />
                {/*<span className="text-white font-italic font-size-12">Your passwords do not match</span>*/}
            </div>
            <div>
                <button className="btn btn-primary width-100 mb3" id="submit">
                    {t('authentification_create_account')}
                </button>
                <a onClick={setToLogin} className="text-color-white">
                    <i className="fas fa-arrow-left" />
                    {` ${t('authentification_back_to_login')}`}
                </a>
            </div>
        </form>
    );
};

export default Registration;
