import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import BasicComponent from '../../../../common/abstract/component/BasicComponent';
import logo from './../../../../static/resources/images/logo.png';
import type {LoginRequest} from "../../request/LoginRequest";
import LoginRequestBuilder from "../../request/LoginRequest";
import RootScope from "../../../../global/RootScope";

const propTypes = {
	doLogin: PropTypes.func.isRequired
};
export default class Login extends BasicComponent {
	loginRequest: LoginRequest;

	onSubmit(event) {
		event.preventDefault();
		this.loginRequest = LoginRequestBuilder.build(this.refs.email.value, this.refs.password.value, this.refs.rememberMe.checked);
		this.props.doLogin(this.loginRequest, this.context.router.history);
	}

	render() {
		return (
			<div>
				<div className="card">
					<div className="card-header">
						<h3 className="text-white">Sign In</h3>
						<div className="d-flex justify-content-end social_icon">
							<span><i className="fa fa-facebook-square"></i></span>
							<span><i className="fa fa-google-plus-square"></i></span>
							<span><i className="fa fa-twitter-square"></i></span>
						</div>
					</div>
					<div className="card-body">
						<form>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text d-flex justify-content-center align-items-center">
										<i className="fa fa-user"></i>
									</span>
								</div>
								<input type="text" className="form-control" placeholder="username" />
							</div>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text d-flex justify-content-center align-items-center">
										<i className="fa fa-key">
										</i>
									</span>
								</div>
								<input type="password" className="form-control" placeholder="password" />
							</div>
							<div className="row align-items-center remember text-white">
								<input type="checkbox" />Remember Me
							</div>
							<div className="form-group">
								<input type="submit" value="Login" className="btn float-right login_btn" />
							</div>
						</form>
					</div>
					<div className="card-footer">
						<div className="d-flex justify-content-center links text-white">
							Don't have an account?  <a className="ml-1" href="#">Sign Up</a>
						</div>
						<div className="d-flex justify-content-center">
							<a href="#">Forgot your password?</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
Login.contextTypes = RootScope.contextTypesDefault;
Login.propTypes = propTypes;
