import React from 'react';
import BasicComponent from '../../../../common/abstract/component/BasicComponent';
import logo from './../../../../static/resources/images/logo.png';
import PropTypes from "prop-types";
import type {RegisterRequest} from "../../request/RegisterRequest";
import RegisterRequestBuilder from "../../request/RegisterRequest";
import RootScope from "../../../../global/RootScope";

const propTypes = {
	doRegister: PropTypes.func.isRequired
};
export default class Registration extends BasicComponent {
	registerRequest: RegisterRequest;

	onSubmit(event) {
		event.preventDefault();
		const gender = (this.refs.gender.value === "Male");
		this.registerRequest = RegisterRequestBuilder.build(this.refs.username.value, this.refs.password.value, this.refs.email.value,
			this.refs.firstName.value, this.refs.lastName.value, new Date(this.refs.born.value), gender);
		this.props.doRegister(this.registerRequest, this.context.router.history);
	}

	render() {
		return (
			<div id="login-page-full">
				<div id="login-full-wrapper">
					<div className="container">
						<div className="row">
							<div className="col-xs-12">
								<div id="login-box">
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
														<span className="input-group-addon"><i className="fa fa-user"/></span>
														<input className="form-control" type="text" ref="firstName"
															   placeholder="First name"/>
													</div>
													<div className="input-group">
														<span className="input-group-addon"><i className="fa fa-user"/></span>
														<input className="form-control" type="text" ref="lastName"
															   placeholder="Last name"/>
													</div>
													<div className="input-group">
														<span className="input-group-addon"><i
															className="fa fa-address-book"/></span>
														<input className="form-control" type="text" ref="username"
															   placeholder="Username"/>
													</div>
													<div className="input-group">
														<span className="input-group-addon"><i
															className="fa fa-envelope"/></span>
														<input className="form-control" type="text" ref="email"
															   placeholder="Email address"/>
													</div>
													<div className="input-group">
														<span className="input-group-addon"><i className="fa fa-lock"/></span>
														<input type="password" className="form-control" ref="password"
															   placeholder="Enter password"/>
													</div>
													<div className="input-group">
														<span className="input-group-addon"><i
															className="fa fa-calendar"/></span>
														<input type="date" className="form-control" ref="born"
															   id="datepickerDate"/>
													</div>
													<div className="form-group">
														<select className="form-control" ref="gender">
															<option value="Male">Male</option>
															<option value="Female">Female</option>
														</select>
													</div>
													<div id="remember-me-wrapper">
														<div className="row">
															<div className="col-xs-12">
																<div className="checkbox-nice">
																	<input type="checkbox" id="terms-cond"
																		   defaultChecked/>
																	<label htmlFor="terms-cond">
																		I accept terms and conditions
																	</label>
																</div>
															</div>
														</div>
													</div>
													<div className="row">
														<div className="col-xs-12">
															<button type="submit"
																	className="btn btn-success col-xs-12">Register
															</button>
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
		);
	}
}
Registration.contextTypes = RootScope.contextTypesDefault;
Registration.propTypes = propTypes;
