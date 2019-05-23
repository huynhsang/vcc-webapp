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
			<div id="login-page-full">
				<div id="login-full-wrapper">
					<div className="container">
						<div className="row">
							<div className="col-xs-12">
								<div id="login-box">
									<div id="login-box-holder">
										<div className="row">
											<div className="col-xs-12">
												<header id="login-header">
													<div id="login-logo">
														<img src={logo} alt=""/>
													</div>
												</header>
												<div id="login-box-inner">
													<form onSubmit={(e) => this.onSubmit(e)}>
														<div className="input-group">
															<span className="input-group-addon"><i
																className="fa fa-user"/></span>
															<input className="form-control" type="text" ref="email"
																   placeholder="Email address"/>
														</div>
														<div className="input-group">
															<span className="input-group-addon"><i
																className="fa fa-key"/></span>
															<input type="password" className="form-control"
																   ref="password" placeholder="Password"/>
														</div>
														<div id="remember-me-wrapper">
															<div className="row">
																<div className="col-xs-6">
																	<div className="checkbox-nice">
																		<input type="checkbox" id="remember-me"
																			   ref="rememberMe" defaultChecked/>
																		<label htmlFor="remember-me">
																			&nbsp;Remember me
																		</label>
																	</div>
																</div>
																<Link to="/forgot-password" id="login-forget-link"
																	  className="col-xs-6">
																	Forgot password?
																</Link>
															</div>
														</div>
														<div className="row">
															<div className="col-xs-12">
																<button type="submit"
																		className="btn btn-success col-xs-12">Login
																</button>
															</div>
														</div>
														<div className="row">
															<div className="col-xs-12">
																<p className="social-text">Or login with</p>
															</div>
														</div>
														<div className="row">
															<div className="col-xs-12 col-sm-6">
																<button type="submit"
																		className="btn btn-primary col-xs-12 btn-facebook">
																	<i className="fa fa-facebook"/> facebook
																</button>
															</div>
															<div className="col-xs-12 col-sm-6">
																<button type="submit"
																		className="btn btn-primary col-xs-12 btn-twitter">
																	<i className="fa fa-twitter"/> Twitter
																</button>
															</div>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>

									<div id="login-box-footer">
										<div className="row">
											<div className="col-xs-12">
												Do not have an account?&nbsp;
												<Link to="/registration">
													Register now
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
Login.contextTypes = RootScope.contextTypesDefault;
Login.propTypes = propTypes;