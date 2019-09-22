import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RegisterRequest } from '../../global/RegisterRequest';
import RegisterRequestBuilder from '../../global/RegisterRequest';
import { Link } from 'react-router-dom';
import ApplicationUtil from '../../common/util/ApplicationUtil';
import { showSuccessAlertFn, showErrorAlertFn } from '../../actions/sweetAlert';
import AccountJWTService from '../../services/AccountJWTService';

const Registration = ({ history, showSuccessAlert, showErrorAlert }) => {
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
                    history.push('/user/login');
                } else {
                    showErrorAlert(result.data);
                }
            }
        );
    };

    return (
        <div className="bg-unauthenticated register-page text-color-white">
            <form
                className="register box-shadow"
                onSubmit={e => this.onSubmit(e)}
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
                    <button
                        className="btn btn-primary width-100 mb3"
                        id="submit"
                    >
                        Create Account
                    </button>
                    <Link to="/user/login" className="text-color-white">
                        <i className="fas fa-arrow-left" /> Back to login
                    </Link>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    showSuccessAlert: (title, text) =>
        dispatch(showSuccessAlertFn(title, text)),
    showErrorAlert: data =>
        dispatch(showErrorAlertFn('Error!', ApplicationUtil.getErrorMsg(data)))
});

export default connect(
    null,
    mapDispatchToProps
)(Registration);
