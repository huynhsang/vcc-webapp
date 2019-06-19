import React from 'react';
import BasicComponent from '../../../../common/abstract/component/BasicComponent';
import PropTypes from "prop-types";
import type {RegisterRequest} from "../../request/RegisterRequest";
import RegisterRequestBuilder from "../../request/RegisterRequest";

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
		this.props.doRegister(this.registerRequest, this.props.history);
	}

	render() {
		return (
			<div id="login-page-full">
				<form className="register" onSubmit={(e) => this.onSubmit(e)} method="post">
					<h2 className="text-white">Sign Up</h2>
					<p>
						<label htmlFor="Firstname" className="floatLabel font-size-16 text-white">First Name</label>
						<input id="Username" className="font-size-14" name="First name" type="text" ref="firstname"
							   placeholder="Enter first name"/>
					</p>
					<p>
						<label htmlFor="Lastname" className="floatLabel font-size-16 text-white">Last Name</label>
						<input id="Username" className="font-size-14" name="Last name" type="text" ref="lastname"
							   placeholder="Enter last name"/>
					</p>
					<p>
						<label htmlFor="Email" className="floatLabel font-size-16 text-white">Email</label>
						<input id="Email" className="font-size-14" name="Email" ref="email"
							   type="text" placeholder="Email address" />
					</p>
					<p>
						<label htmlFor="password" className="floatLabel font-size-16 text-white">Password</label>
						<input id="password" className="font-size-14" name="password" ref="password"
							   type="password" placeholder="Password" />
							{/*<span className="text-white font-italic font-size-12">Enter a password longer than 8 characters</span>*/}
					</p>
					<p>
						<label htmlFor="confirm_password" className="floatLabel font-size-16 text-white">Confirm Password</label>
						<input id="confirm_password" className="font-size-14" name="confirm_password" ref="confirm_password"
							   type="password" placeholder="Enter the password" />
							{/*<span className="text-white font-italic font-size-12">Your passwords do not match</span>*/}
					</p>
					<a className="btn create-account font-weight-bold" id="submit">Create Account</a>
				</form>
			</div>
		);
	}
}
Registration.propTypes = propTypes;
