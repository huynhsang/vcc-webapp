import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import BasicComponent from "../../../common/abstract/component/BasicComponent";
import ApplicationUtil from "../../../common/util/ApplicationUtil";
import type {Group} from "../../../domain/Group";

const propTypes = {
	groups: PropTypes.array.isRequired
};
export default class GroupList extends BasicComponent {
	render() {
		const groups: Array<Group> = this.props.groups;
		return (
			// <!-- .row -->
			<div className="row">
				{
					groups.map((item, index) => {
						const groupAvatar: string = ApplicationUtil.getFullImageURL(item.avatar);
						const groupUrl: string = `/group/${item.urlName}`;
						return (
							<div key={index} className="col-md-6 col-lg-6 col-xlg-4">
								<div className="card card-body">
									<div className="row">
										<div className="col-md-4 col-lg-3 text-center">
											<a><img src={groupAvatar} alt="Group avatar" className="img-circle img-fluid"/></a>
										</div>
										<div className="col-md-8 col-lg-9">
											<h4><Link to={groupUrl} className="box-title m-b-0">{item.name}</Link></h4>
											<i>{item.privacy}</i>
											<address>
												<div className="block-with-text">{item.description}</div>
												<br/>
												<abbr title="Created">C:</abbr> {new Date(item.createdDate).toDateString()}
											</address>
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
GroupList.propTypes = propTypes;