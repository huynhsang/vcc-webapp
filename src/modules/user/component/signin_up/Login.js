import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import BasicComponent from '../../../../common/abstract/component/BasicComponent';
import type {LoginRequest} from "../../request/LoginRequest";
import LoginRequestBuilder from "../../request/LoginRequest";

const propTypes = {
	doLogin: PropTypes.func.isRequired
};
export default class Login extends BasicComponent {
	loginRequest: LoginRequest;

	onSubmit(event) {
		event.preventDefault();
		this.loginRequest = LoginRequestBuilder.build(this.refs.email.value, this.refs.password.value, this.refs.rememberMe.checked);
		this.props.doLogin(this.loginRequest, this.props.history);
	}

	render() {
		return (
			<div className="bg-unauthenticated">
				<div className="login-page">
					<div className="card">
						<div className="card-header">
							<h3 className="text-color-white">Sign In</h3>
							<div className="social_icon">
								<span><i className="fab fa-facebook-square"/></span>
								<span><i className="fab fa-google-plus-square"/></span>
								<span><i className="fab fa-twitter-square"/></span>
							</div>
						</div>
						<div className="card-body">
							<form onSubmit={(e) => this.onSubmit(e)}>
								<div className="form-group-login flex-center mb2">
									<div className="input-group-prepend flex-center">
										<span className="text-color-white">
											<i className="fa fa-user"/>
										</span>
									</div>
									<input type="text" className="form-control" ref="email" placeholder="email" />
								</div>
								<div className="form-group-login flex-center mb2">
									<div className="input-group-prepend flex-center">
										<span className="text-color-white">
											<i className="fa fa-key"/>
										</span>
									</div>
									<input type="password" className="form-control" ref="password" placeholder="password" />
								</div>
								<div className="row align-items-center remember text-white">
									<input type="checkbox" ref="rememberMe" />Remember Me
								</div>
								<div className="form-group">
									<button type="submit" className="login_btn">Login</button>
								</div>
							</form>
						</div>
						<div className="card-footer">
							<div className="d-flex justify-content-center links text-white">
								Don't have an account?  <Link to="/registration" className="ml-1">Sign Up</Link>
							</div>
							<div className="d-flex justify-content-center">
								<Link to="/forgot-password">Forgot your password?</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
Login.propTypes = propTypes;
