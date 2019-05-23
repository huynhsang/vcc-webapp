import React from 'react';
import PropTypes from 'prop-types';
import BasicComponent from "../../../common/abstract/component/BasicComponent";
import EventConstant from "../../../common/constant/EventConstant";
import EventUtil from "../../../common/util/EventUtil";
import {Link} from "react-router-dom";

const propTypes = {
	events: PropTypes.array.isRequired
};
export default class EventsContent extends BasicComponent {
	handleAfterRendering(): void {
		window.initEventChart();
	}

	render() {
		return (
			<div className="row">
				{
					this.props.events.map((item, index) => {
						const pos: number = index % 6;
						return (
							<div key={index} className="col-lg-4 col-md-6 col-sm-6">
								<div className={`main-box clearfix project-box ${EventConstant.eventCssColor[pos].box}`}>
									<div className="main-box-body clearfix">
										<div className={`project-box-header ${EventConstant.eventCssColor[pos].background}`}>
											<div className="name">
												<Link to={`/event/${item.id}`}>
													{item.name}
												</Link>
											</div>
										</div>

										<div className="project-box-content">
								<span className="chart" data-percent={EventUtil.getPercentCountdown(item)} data-bar-color={EventConstant.eventCssColor[pos].processBar}>
									<span className="percent"/>%<br/>
									<span className="lbl">completed</span>
								</span>
										</div>

										<div className="project-box-footer clearfix">
											<a href="/">
												<span className="value">12</span>
												<span className="label">Tasks</span>
											</a>
											<a href="/">
												<span className="value">1</span>
												<span className="label">Alerts</span>
											</a>
											<a href="/">
												<span className="value">82</span>
												<span className="label">Messages</span>
											</a>
										</div>

										<div className="project-box-ultrafooter clearfix">
											<img className="project-img-owner" alt="" src="https://cube.adbee.technology/img/samples/scarlet-159.png" data-toggle="tooltip" title="Scarlett Johansson"/>
											<img className="project-img-owner" alt="" src="https://cube.adbee.technology/img/samples/lima-300.jpg" data-toggle="tooltip" title="Adriana Lima"/>
											<img className="project-img-owner" alt="" src="https://cube.adbee.technology/img/samples/emma-300.jpg" data-toggle="tooltip" title="Emma Watson"/>
											<img className="project-img-owner" alt="" src="https://cube.adbee.technology/img/samples/angelina-300.jpg" data-toggle="tooltip" title="Angelina Jolie"/>

											<Link to={`/event/${item.id}`} className="link pull-right">
												<i className="fa fa-arrow-circle-right fa-lg"/>
											</Link>
										</div>
									</div>
								</div>
							</div>
						)
					})
				}
			</div>
		)
	}
}
EventsContent.propTypes = propTypes;