import React from 'react';
import {Link} from 'react-router-dom'
import BasicComponent from '../../../../common/abstract/component/BasicComponent';
import logo from './../../../../static/resources/images/logo.png';

export default class ForgotPassword extends BasicComponent {

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
												<div id="login-box-inner" className="with-heading">
													<h4>Forgot your password?</h4>
													<p>
														Enter your email address to recover your password.
													</p>
													<form>
														<div className="input-group reset-pass-input">
															<span className="input-group-addon"><i
																className="fa fa-user"/></span>
															<input className="form-control" type="text"
																   placeholder="Email address"/>
														</div>
														<div className="row">
															<div className="col-xs-12">
																<button type="submit"
																		className="btn btn-success col-xs-12">Reset
																	password
																</button>
															</div>
															<div className="col-xs-12">
																<br/>
																<Link to="/login" id="login-forget-link"
																	  className="forgot-link col-xs-12">Back to
																	login</Link>
															</div>
														</div>
													</form>
												</div>
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
