import React from 'react';
import BasicComponent from '../../../../common/abstract/component/BasicComponent';
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
		const isEnable = (this.refs.isEnable.value === true);
		this.registerRequest = RegisterRequestBuilder.build(this.refs.username.value, this.refs.password.value, this.refs.email.value,
			this.refs.firstName.value, this.refs.lastName.value, isEnable);
		this.props.doRegister(this.registerRequest, this.context.router.history);
	}

	render() {
		return (
			<div className="register-page">
				<form className="register" onSubmit={(e) => this.onSubmit(e)} method="post">
					<h2 className="text-white">Sign Up</h2>
					<div className="row mb-3">
                        <div className="col-6">
						<label htmlFor="Firstname" className="floatLabel font-size-16 text-white">First Name</label>
						<input id="Firstname" className="font-size-14" name="First name" type="text" ref="firstName"
							   placeholder="Enter First Name"/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="Lastname" className="floatLabel font-size-16 text-white">Last Name</label>
                            <input id="Lastname" className="font-size-14" name="Last name" type="text" ref="lastName"
                                   placeholder="Enter Last Name"/>
                        </div>
					</div>
                    <div className="mb-3">
                        <label htmlFor="Username" className="floatLabel font-size-16 text-white">Username</label>
                        <input id="Username" className="font-size-14" name="Username" ref="username"
                               type="text" placeholder="Enter Username" />
                    </div>
					<div className="mb-3">
						<label htmlFor="Email" className="floatLabel font-size-16 text-white">Email</label>
						<input id="Email" className="font-size-14" name="Email" ref="email"
							   type="text" placeholder="Email Address" />
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="floatLabel font-size-16 text-white">Password</label>
						<input id="password" className="font-size-14" name="password" ref="password"
							   type="password" placeholder="Password" />
							{/*<span className="text-white font-italic font-size-12">Enter a password longer than 8 characters</span>*/}
					</div>
					<div className="mb-3">
						<label htmlFor="confirm_password" className="floatLabel font-size-16 text-white">Confirm Password</label>
						<input id="confirm_password" className="font-size-14" name="confirm_password" ref="confirm_password"
							   type="password" placeholder="Enter the password" />
							{/*<span className="text-white font-italic font-size-12">Your passwords do not match</span>*/}
					</div>
					<button className="btn create-account w-100 font-weight-bold" id="submit">Create Account</button>
				</form>
			</div>
		);
	}
}
Registration.contextTypes = RootScope.contextTypesDefault;
Registration.propTypes = propTypes;
