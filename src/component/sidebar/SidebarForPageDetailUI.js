import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import BasicComponent from "../../common/abstract/component/BasicComponent";
import {handleDataForSidebar} from "./implement/SidebarForDetailUIImpl";
import type {Page} from "../../domain/Page";
import ApplicationUtil from "../../common/util/ApplicationUtil";
import RootScope from "../../global/RootScope";

const propTypes = {
	pageData: PropTypes.object.isRequired,
	path: PropTypes.string.isRequired
};
export default class SidebarPageDetail extends BasicComponent {
	handleBeforeTheFirstRender(): void {
		handleDataForSidebar(this);
	}

	render() {
		const UIData = this.state.UIData;
		const mainPath = this.props.path;
		const pageData:Page = this.props.pageData;
		return (
			<div id="nav-col">
				<section id="col-left" className="col-left-nano">
					<div id="col-left-inner" className="col-left-nano-content">
						<div id="user-left-box" style={{paddingLeft: "15px"}} className="clearfix hidden-sm hidden-xs user-left-box-custom">
							<img alt="avatar" src={ApplicationUtil.getFullImageURL(pageData.avatar)}/>
							<div className="">
								<span className="text">
									<div style={{fontSize: "18px"}}>{pageData.name}</div>
								</span>
								<small>{pageData.category}</small>
							</div>
						</div>
						<div className="collapse navbar-collapse navbar-ex1-collapse" id="sidebar-nav">
							<ul className="nav nav-pills nav-stacked">
								<li className="nav-header nav-header-first hidden-sm hidden-xs">
									Navigation
								</li>
								{
									UIData.navigation.map((element, index) => {
										const path: string = mainPath + element.path;
										const activeClass = UIData.currentPath === path ? 'active' : '';
										return (
											<li key={index} className={activeClass}>
												<Link to={path}>
													<i className={element.iconClass}/>
													<span>{element.name}</span>
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
											<a href="/">
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
											<a href="/">
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
											<a href="/">
												Morris &amp; Mixed
											</a>
										</li>
									</ul>
								</li>
								<li>
									<a href="/">
										<i className="fa fa-th-large"/>
										<span>Widgets</span>
										<span className="label label-success pull-right">New</span>
									</a>
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
SidebarPageDetail.contextTypes = RootScope.contextTypesDefault;
SidebarPageDetail.propTypes = propTypes;