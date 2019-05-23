import React from 'react';
// import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import BasicComponent from "../../common/abstract/component/BasicComponent";
import {handleDataForUI} from "./implement/SidebarLeftImpl";
import RootScope from "../../global/RootScope";
import ApplicationUtil from "../../common/util/ApplicationUtil";

export default class SidebarLeft extends BasicComponent {

	handleBeforeTheFirstRender(): void {
		handleDataForUI(this);
	}

	render() {
		const data = this.state.data;
		const avatar = RootScope.currentUser ? ApplicationUtil.getFullImageURL(RootScope.currentUser.avatar) : '';
		return (
			<div id="nav-col">
				<section id="col-left" className="col-left-nano">
					<div id="col-left-inner" className="col-left-nano-content">
						<div id="user-left-box" className="clearfix hidden-sm hidden-xs dropdown profile2-dropdown">
							<img alt="" src={avatar}/>
							<div className="user-box">
									<span className="name">
										<Link to="/" className="dropdown-toggle" data-toggle="dropdown">
											Scarlett J.
											<i className="fa fa-angle-down"/>
										</Link>
										<ul className="dropdown-menu">
											<li><Link to="/"><i className="fa fa-user"/>Profile</Link></li>
											<li><Link to="/"><i className="fa fa-cog"/>Settings</Link></li>
											<li><Link to="/"><i className="fa fa-envelope-o"/>Messages</Link></li>
											<li><Link to="/"><i className="fa fa-power-off"/>Logout</Link></li>
										</ul>
									</span>
									<span className="status">
										<i className="fa fa-circle"/> Online
									</span>
							</div>
						</div>
						<div className="collapse navbar-collapse navbar-ex1-collapse" id="sidebar-nav">
							<ul className="nav nav-pills nav-stacked">
								<li className="nav-header nav-header-first hidden-sm hidden-xs">
									Navigation
								</li>
								{
									data.navigation.map((element, index) => {
										return (
											<li key={index}
												className={data.currentPath === element.path ? 'active' : ''}>
												<Link to={element.path}>
													<i className={element.iconClass}/>
													<span>{element.name}</span>
													{
														(element.name === "Messages") ? <span
															className="label label-primary label-circle pull-right">28</span> : ""
													}
												</Link>
											</li>
										)
									})
								}
								<li className="nav-header hidden-sm hidden-xs">
									Shortcuts
								</li>
								<li>
									<Link to="/" className="dropdown-toggle">
										<i className="fa fa-table"/>
										<span>Tables</span>
										<i className="fa fa-angle-right drop-icon"/>
									</Link>
									<ul className="submenu">
										<li>
											<a href="tables.html">
												Simple
											</a>
										</li>
									</ul>
								</li>
								<li>
									<Link to="/" className="dropdown-toggle">
										<i className="fa fa-envelope"/>
										<span>Email</span>
										<i className="fa fa-angle-right drop-icon"/>
									</Link>
									<ul className="submenu">
										<li>
											<a href="email-inbox.html">
												Inbox
											</a>
										</li>
									</ul>
								</li>
								<li>
									<Link to="/" className="dropdown-toggle">
										<i className="fa fa-bar-chart-o"/>
										<span>Graphs</span>
										<i className="fa fa-angle-right drop-icon"/>
									</Link>
									<ul className="submenu">
										<li>
											<a href="graphs-morris.html">
												Morris &amp; Mixed
											</a>
										</li>
									</ul>
								</li>
								<li>
									<a href="widgets.html">
										<i className="fa fa-th-large"/>
										<span>Widgets</span>
										<span className="label label-success pull-right">New</span>
									</a>
								</li>
								<li className="nav-header hidden-sm hidden-xs">
									Explore
								</li>
								{
									data.explorers.map((element, index) => {
										return (
											<li key={index}
												className={data.currentPath === element.path ? 'active' : ''}>
												<Link to={element.path}>
													<i className={element.iconClass}/>
													<span>{element.name}</span>
													{
														(element.addition) ? element.addition : ""
													}
												</Link>
											</li>
										)
									})
								}
							</ul>
						</div>
					</div>
				</section>
				<div id="nav-col-submenu"/>
			</div>
		)
	}
}

SidebarLeft.contextTypes = RootScope.contextTypesDefault;