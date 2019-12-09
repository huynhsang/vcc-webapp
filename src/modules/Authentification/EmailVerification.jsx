import React from 'react';
import { Link } from 'react-router-dom';

import { verifyEmail } from '../../services/account.service';

const EmailVerification = ({ location, history }) => {
    const [message, setMessage] = React.useState('Your email is verifying...');

    React.useEffect(() => {
        const search = new URLSearchParams(location.search);
        const uid = search.get('uid');
        const token = search.get('token');
        if (!uid || !token) {
            history.push('/home/questions');
        } else {
            verifyEmail(uid, token)
                .then(() => {
                    setMessage('Registration verified successfully');
                })
                .catch(() => {
                    setMessage(
                        'Registration has not been successfully verified'
                    );
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
