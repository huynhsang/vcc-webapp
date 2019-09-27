import React from 'react';

const ForgotPassword = ({ setToLogin }) => {
    return (
        <div className="p10 pl3 pr3">
            <div className="forgot-page box-shadow text-color-white">
                <h3 className="text-center">
                    <i className="fa fa-lock fa-4x" />
                </h3>
                <h2 className="text-center">Forgot Password?</h2>
                <p className="text-center">
                    Enter your email address to recover your password.
                </p>
                <form>
                    <input
                        id="emailInput"
                        placeholder="Email address"
                        type="email"
                    />
                    <button className="btn btn-primary width-100 mb3">
                        Reset password
                    </button>
                    <a
                        onClick={setToLogin}
                        className="text-left text-color-white"
                    >
                        <i className="fas fa-arrow-left" /> Back to login
                    </a>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
