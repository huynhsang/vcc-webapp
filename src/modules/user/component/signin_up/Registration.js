import React from 'react';
import BasicComponent from '../../../../common/abstract/component/BasicComponent';
import PropTypes from "prop-types";
import type {RegisterRequest} from "../../request/RegisterRequest";
import RegisterRequestBuilder from "../../request/RegisterRequest";
import {Link} from "react-router-dom";

const propTypes = {
	doRegister: PropTypes.func.isRequired
};
export default class Registration extends BasicComponent {
	registerRequest: RegisterRequest;

	onSubmit(event) {
		event.preventDefault();
		this.registerRequest = RegisterRequestBuilder.build(this.refs.password.value, this.refs.email.value,
			this.refs.firstName.value, this.refs.lastName.value, null);
		this.props.doRegister(this.registerRequest, this.props.history);
	}

	render() {
		return (
			<div className="bg-unauthenticated register-page text-color-white">
				<form className="register box-shadow" onSubmit={(e) => this.onSubmit(e)} method="post">
					<h2 className="text-center">Sign Up</h2>
					<div className="row mb3">
						<div className="col-6">
							<label htmlFor="Firstname" className="floatLabel font-size-16">First Name</label>
							<input id="firstname" className="font-size-14" name="First name" type="text" ref="firstName"
								   placeholder="Enter first name"/>
						</div>
						<div className="col-6">
							<label htmlFor="Lastname" className="font-size-16">Last Name</label>
							<input id="lastname" className="font-size-14" name="Last name" type="text" ref="lastName"
								   placeholder="Enter last name"/>
						</div>
					</div>
					<div className="mb3">
						<label htmlFor="Email" className="font-size-16">Email</label>
						<input id="Email" className="font-size-14" name="Email" ref="email"
							   type="text" placeholder="Email address" />
					</div>
					<div className="mb3">
						<label htmlFor="password" className="font-size-16">Password</label>
						<input id="password" className="font-size-14" name="password" ref="password"
							   type="password" placeholder="Password" />
							{/*<span className="text-white font-italic font-size-12">Enter a password longer than 8 characters</span>*/}
					</div>
					<div className="mb4">
						<label htmlFor="confirm_password" className="font-size-16">Confirm Password</label>
						<input id="confirm_password" className="font-size-14" name="confirm_password" ref="confirm_password"
							   type="password" placeholder="Enter the password" />
							{/*<span className="text-white font-italic font-size-12">Your passwords do not match</span>*/}
					</div>
					<div>
						<button className="btn btn-primary width-100 mb3" id="submit">Create Account</button>
						<Link to="/login" className="text-color-white">
							<i className="fas fa-arrow-left"/> Back to login
						</Link>
					</div>
				</form>
			</div>
		);
	}
}
Registration.propTypes = propTypes;
