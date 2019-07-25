import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import BasicComponent from '../../../../common/abstract/component/BasicComponent';

const propTypes = {
	doVerifyEmail: PropTypes.func.isRequired
};
export default class EmailVerification extends BasicComponent {
	constructor(props) {
        super(props);
        this.state = {message: 'Your email is verifying...'};
    }

	handleBeforeTheFirstRender(): void {
        const search = new URLSearchParams(this.props.location.search);
        const uid: number = search.get('uid');
        const token: string = search.get('token');
        if (!uid || !token) {
        	this.props.history.push('/');
        } else {
        	this.props.doVerifyEmail(uid, token, this);
        }
    }

	render() {
		const {message} = this.state;
		return (
			<div className="bg-unauthenticated">
				<div className="login-page">
					<div className="card box-shadow">
						<div className="card-header position-relative">
							<h3 className="text-color-white">
								{message}
							</h3>
						</div>
						<div className="text-center">
							<Link to="/" className="text-color-white">
								Go to home
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
EmailVerification.propTypes = propTypes;
