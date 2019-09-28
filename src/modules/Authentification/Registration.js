import React from 'react';
import { RegisterRequest } from '../../global/RegisterRequest';
import RegisterRequestBuilder from '../../global/RegisterRequest';
import { Link } from 'react-router-dom';
import AccountJWTService from '../../services/accountJWT.service';

const Registration = ({
    history,
    showSuccessAlert,
    showErrorAlert,
    setToLogin
}) => {
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
        <form
            className="register box-shadow"
            onSubmit={onSubmit}
            method="post"
        >
            <h2 className="text-center">Sign Up</h2>
            <div className="row mb3">
                <div className="col-6">
                    <label
                        htmlFor="Firstname"
                        className="floatLabel font-size-16"
                    >
                        First Name
                    </label>
                    <input
                        id="firstname"
                        className="font-size-14"
                        name="First name"
                        type="text"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={ev => setFirstName(ev.target.value)}
                    />
                </div>
                <div className="col-6">
                    <label htmlFor="Lastname" className="font-size-16">
                        Last Name
                    </label>
                    <input
                        id="lastname"
                        className="font-size-14"
                        name="Last name"
                        type="text"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={ev => setLastName(ev.target.value)}
                    />
                </div>
            </div>
            <div className="mb3">
                <label htmlFor="Email" className="font-size-16">
                    Email
                </label>
                <input
                    id="Email"
                    className="font-size-14"
                    name="Email"
                    type="text"
                    placeholder="Email address"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}
                />
            </div>
            <div className="mb3">
                <label htmlFor="password" className="font-size-16">
                    Password
                </label>
                <input
                    id="password"
                    className="font-size-14"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                />
                {/*<span className="text-white font-italic font-size-12">Enter a password longer than 8 characters</span>*/}
            </div>
            <div className="mb4">
                <label htmlFor="confirm_password" className="font-size-16">
                    Confirm Password
                </label>
                <input
                    id="confirm_password"
                    className="font-size-14"
                    name="confirm_password"
                    type="password"
                    placeholder="Enter the password"
                    value={confirmPassword}
                    onChange={ev => setConfirmPassword(ev.target.value)}
                />
                {/*<span className="text-white font-italic font-size-12">Your passwords do not match</span>*/}
            </div>
            <div>
                <button className="btn btn-primary width-100 mb3" id="submit">
                    Create Account
                </button>
                <a onClick={setToLogin} className="text-color-white">
                    <i className="fas fa-arrow-left" /> Back to login
                </a>
            </div>
        </form>
    );
};

export default Registration;
