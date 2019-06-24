import React from 'react';
import BasicComponent from '../../../../common/abstract/component/BasicComponent';
import ErrorImageV2 from '../../../../static/resources/img/errors/error-404-v2.png';
import ErrorImageV3 from '../../../../static/resources/img/errors/error-404-v3.png';
import RootScope from "../../../../global/RootScope";

export default class RouteNotFound extends BasicComponent {

	handleAfterTheFirstRender() {
		this._interval = setInterval(() => {
			console.log(this.context);
            this.props.history.push('/');
            console.log(this.props);
		}, 3000);
	}

	handleAfterComponentIsUnmounted() {
		clearInterval(this._interval);
	}

	render() {
		const ErrorImage = (RootScope.currentUser ? ErrorImageV2 : ErrorImageV3);
		return (
			<div id="error-page">
				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<div id="error-box">
								<div className="row">
									<div className="col-xs-12">
										<div id="error-box-inner">
											<img src={ErrorImage} alt="Have you seen this page?"/>
										</div>
										<h1>ERROR 404</h1>
										<p>
											Page not found.<br/>
											If you find this page, let us know.
										</p>
										<p>
											Go back to <a href="/">homepage</a>.
										</p>
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
