import React from 'react';
import { connect } from 'react-redux';

import { getUserByLoginTokenFn } from '../../actions/app';

const SSOLogin = ({ location, history, getUserByLoginToken }) => {

    React.useEffect(() => {
        const search = new URLSearchParams(location.search);
        const token = search.get('access_token');
        if (token) {
            getUserByLoginToken(token);
        }
        history.push('/homes/questions');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-unauthenticated">
            <div className="login-page">
                <div className="card box-shadow">
                    <div className="card-header position-relative">
                        <h3 className="text-color-white">Log in...</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    getUserByLoginToken: token => dispatch(getUserByLoginTokenFn(token))
});

export default connect(null, mapDispatchToProps)(SSOLogin);
