import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import BasicComponent from "../../common/abstract/component/BasicComponent";
import RootScope from "../../global/RootScope";
import EventDetailLogo from "../../static/resources/images/event-detail.png";

const propTypes = {
	path: PropTypes.string.isRequired
};
export default class SidebarEventDetail extends BasicComponent {
	render() {
		const mainPath = this.props.path;
		const isAboutActive: boolean = this.context.router.route.location.pathname === `${mainPath}/about`;
		return (
			<div id="nav-col">
				<section id="col-left" className="col-left-nano">
					<div id="col-left-inner" className="col-left-nano-content">
						<div id="user-left-box" style={{paddingLeft: "15px"}} className="clearfix hidden-sm hidden-xs">
							<img alt="Event detail logo" src={EventDetailLogo}/>
							<div className="user-box">
								<p style={{fontSize: "24px"}}>
									Event
								</p>
							</div>
						</div>
						<div className="collapse navbar-collapse navbar-ex1-collapse" id="sidebar-nav">
							<ul className="nav nav-pills nav-stacked">
								<li className="nav-header nav-header-first hidden-sm hidden-xs">
									Navigation
								</li>
								<li className={isAboutActive ? "": "active"}>
									<Link to={mainPath}>
										<i className="fa fa-home"/>
										<span>Home</span>
									</Link>
								</li>
								<li className={isAboutActive ? "active": ""}>
									<Link to={`${mainPath}/about`}>
										<i className="fa fa-address-book-o"/>
										<span>About</span>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<div id="nav-col-submenu"/>
			</div>
		)
	}
}
SidebarEventDetail.contextTypes = RootScope.contextTypesDefault;
SidebarEventDetail.propTypes = propTypes;