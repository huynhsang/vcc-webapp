import React from 'react';
import { Link } from 'react-router-dom';
import LoginRequestBuilder from '../../global/LoginRequest';

import {
    getCurrentUser,
} from '../../common/util/AccountUtil';

import AccountJWTService from '../../services/accountJWT.service';
import CookieHelper from '../../common/util/CookieHelper';
import CookieConstant from '../../common/constant/CookieConstant';
import RootScope from '../../global/RootScope';
import Result from '../../global/Result';

const Login = ({
    history,
    updateAuthenticated,
    showSuccessAlert,
    showErrorAlert,
    setToFindPassword,
    setToRegistre
}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false);

    const onSubmit = event => {
        event.preventDefault();
        const data = LoginRequestBuilder.build(email, password, rememberMe);

        AccountJWTService.doAuthenticate(data).then((result: Result) => {
            if (result.isSuccess()) {
                RootScope.token = result.data.id;
                RootScope.userId = result.data.userId;
                const exdays = data.rememberMe
                    ? CookieConstant.maxExDay
                    : CookieConstant.minExDay;
                CookieHelper.setCookie(
                    CookieConstant.jwtTokenName,
                    RootScope.token,
                    exdays
                );
                CookieHelper.setCookie(
                    CookieConstant.userIdKey,
                    RootScope.userId,
                    exdays
                );
                getCurrentUser().then(() => {
                    updateAuthenticated();
                    showSuccessAlert('Success!', 'Logged in');
                    history.push('/home/questions');
                });
            } else {
                RootScope.resetAuthValues();
                showErrorAlert(result.data);
            }
        });
    };

    return (
        <div className="login-page">
            <div className="card box-shadow">
                <div className="card-header position-relative">
                    <h3 className="text-color-white">Sign In</h3>
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
                                placeholder="email"
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
                                placeholder="password"
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
                            <label htmlFor="checkbox1">Remember Me</label>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="text-center">
                        Don't have an account?{' '}
                        <a
                            onClick={setToRegistre}
                            className="ml-1 text-color-white"
                        >
                            Sign Up
                        </a>
                    </div>
                    <div className="text-center">
                        <a
                            onClick={setToFindPassword}
                            className="text-color-white"
                        >
                            Forgot your password?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
