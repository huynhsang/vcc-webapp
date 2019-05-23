import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import BasicComponent from "../../common/abstract/component/BasicComponent";
import {handleDataForSidebar} from "./implement/SidebarForDetailUIImpl";
import ApplicationUtil from "../../common/util/ApplicationUtil";
import type {Group} from "../../domain/Group";
import RootScope from "../../global/RootScope";

const propTypes = {
	groupData: PropTypes.object.isRequired,
	path: PropTypes.string.isRequired
};
export default class SidebarGroupDetail extends BasicComponent {
	handleBeforeTheFirstRender(): void {
		handleDataForSidebar(this);
	}

	render() {
		const UIData = this.state.UIData;
		const mainPath = this.props.path;
		const group: Group = this.props.groupData;
		return (
			<div id="nav-col">
				<section id="col-left" className="col-left-nano">
					<div id="col-left-inner" className="col-left-nano-content">
						<div id="user-left-box" style={{paddingLeft: "15px"}} className="clearfix hidden-sm hidden-xs user-left-box-custom">
							<img alt="avatar" src={ApplicationUtil.getFullImageURL(group.avatar)}/>
							<div className="">
								<span className="text">
									<div style={{fontSize: "18px"}}>{group.name}</div>
								</span>
								<small>{group.privacy}</small>
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
							</ul>
						</div>
					</div>
				</section>
				<div id="nav-col-submenu"/>
			</div>
		)
	}
}
SidebarGroupDetail.contextTypes = RootScope.contextTypesDefault;
SidebarGroupDetail.propTypes = propTypes;