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
					<div className="card box-shadow">
						<div className="card-header position-relative">
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
									<input type="text" ref="email" placeholder="email" />
								</div>
								<div className="form-group-login flex-center mb2">
									<div className="input-group-prepend flex-center">
										<span className="text-color-white">
											<i className="fa fa-key"/>
										</span>
									</div>
									<input type="password" ref="password" placeholder="password" />
								</div>
								<div className="remember text-color-white display-flex align-items-center">
									<input type="checkbox" id="checkbox1" ref="rememberMe"/>
									<label htmlFor="checkbox1">Remember Me</label>
								</div>
								<div className="text-right">
									<button type="submit" className="btn btn-primary">Login</button>
								</div>
							</form>
						</div>
						<div className="card-footer">
							<div className="text-center">
								Don't have an account?  <Link to="/registration" className="ml-1 text-color-white">Sign Up</Link>
							</div>
							<div className="text-center">
								<Link to="/forgot-password" className="text-color-white">Forgot your password?</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
Login.propTypes = propTypes;
