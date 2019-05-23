import React from 'react';
import PropTypes from "prop-types";
import BasicComponent from "../../../common/abstract/component/BasicComponent";
import {closeModal} from "../../../common/util/ModalJqueryUtil";
import {searchUserToAddMemberByEmail, toggleRole} from "./implement/HandleAddNewUI";
import {Link} from "react-router-dom";
import ApplicationUtil from "../../../common/util/ApplicationUtil";
import ApplicationConstant from "../../../common/constant/ApplicationConstant";

const propTypes = {
	addNewMember: PropTypes.func.isRequired
};
export default class ModalAddNewMember extends BasicComponent {

	constructor() {
		super();
		this.state = {role: ApplicationConstant.role.MEMBER}
	}

	onSubmit(): void {
		if (this.state.user) {
			this.props.addNewMember(this.state.user, this.state.role);
			closeModal();
		}
	}

	onSearch(event) {
		if (event.keyCode === 13 || event.which === 13) {
			searchUserToAddMemberByEmail(this.refs.keyword.value, this);
		}
	}

	render() {
		return (
			<div>
				<div className="md-modal md-effect-7" id="modal-add-new-member">
					<div className="md-content">
						<div className="modal-header">
							<button className="md-close close">&times;</button>
							<h4 className="modal-title">Add new Member</h4>
						</div>
						<div className="modal-body">
							<div className="filter-block">
								<div className="form-group">
									<input type="email" className="form-control" ref="keyword" onKeyPress={(e) => this.onSearch(e)} placeholder="Search user by email..."/>
									<i className="fa fa-search search-icon"/>
								</div>
							</div>
							{
								this.state.user !== undefined ?
									<div className="table-responsive">
										{
											this.state.user ?
												<table className="table user-list table-hover">
													<thead>
														<tr>
															<th><span>User</span></th>
															<th><span>Career</span></th>
															<th>&nbsp;</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>
																<img src={ApplicationUtil.getFullImageURL(this.state.user.avatar)} alt=""/>
																<Link to={`/usr/${this.state.user.id}`} className="user-link">{this.state.user.firstName} {this.state.user.lastName}</Link>
																<span className="user-subhead">{this.state.user.address}</span>
															</td>
															<td>
																<a>{this.state.user.career}</a>
															</td>
															<td className="text-center">
																<button className="btn btn-default" onClick={() => toggleRole(this.state.role, this)}>{this.state.role}</button>
															</td>
														</tr>
													</tbody>
												</table> : <p className="label-danger text-center">Not Found</p>
										}
									</div> : ""
							}
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary" onClick={() => this.onSubmit()}>
								Add
							</button>
						</div>
					</div>
				</div>
				<div className="md-overlay"/>
			</div>
		)
	}
}
// ModalAddNewMember.contextTypes = RootScope.contextTypesDefault;
ModalAddNewMember.propTypes = propTypes;