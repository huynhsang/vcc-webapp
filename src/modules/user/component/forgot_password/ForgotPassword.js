import React from 'react';
import {Link} from 'react-router-dom'
import BasicComponent from '../../../../common/abstract/component/BasicComponent';

export default class ForgotPassword extends BasicComponent {

	render() {
		return (
			<div className="bg-unauthenticated">
				<div className="forgot-page text-white">
					<h3 className="text-center"><i className="fa fa-lock fa-4x"></i></h3>
					<h2 className="text-center">Forgot Password?</h2>
					<p  className="text-center">Enter your email address to recover your password.</p>
					<div className="panel-body">
						<form className="form">
							<div className="form-group">
								<div className="input-group">
									<input id="emailInput" placeholder="Email address"
										   className="form-control" type="email"/>
								</div>
							</div>
							<div className="form-group">
								<button className="btn btn-block btn-yellow font-weight-bold">Reset password</button>
								<Link to="/login" className="mt-4 d-inline-block">Back to login</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
