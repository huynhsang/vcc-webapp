import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AccountJWTService from '../../services/accountJWT.service';
import Result from '../../global/Result';

const EmailVerification = ({ location, history }) => {
    const [message, setMessage] = React.useState('Your email is verifying...');

    React.useEffect(() => {
        const search = new URLSearchParams(location.search);
        const uid: number = search.get('uid');
        const token: string = search.get('token');
        if (!uid || !token) {
            history.push('/');
        } else {
            AccountJWTService.doVerifyEmail(uid, token).then(
                (result: Result) => {
                    if (result.isSuccess()) {
                        setMessage('Registration verified successfully');
                    } else {
                        setMessage(
                            'Registration has not been successfully verified'
                        );
                    }
                }
            );
        }
    }, []);

    return (
        <div className="bg-unauthenticated">
            <div className="login-page">
                <div className="card box-shadow">
                    <div className="card-header position-relative">
                        <h3 className="text-color-white">{message}</h3>
                    </div>
                    <div className="text-center">
                        <Link to="/" className="text-color-white">
                            Go to home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;
