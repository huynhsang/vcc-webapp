import React from 'react';
// import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import BasicComponent from "../../../common/abstract/component/BasicComponent";
import "./css/user-card.css"
import PropTypes from "prop-types";
import ApplicationUtil from "../../../common/util/ApplicationUtil";
import ApplicationConstant from "../../../common/constant/ApplicationConstant";
import type {User} from "../../../domain/User";
import SweetAlert from "../../../global/SweetAlert";
import ModalEditMemberRole from "../../modal/member/EditRole";
import {initModal} from "../../../common/util/ModalJqueryUtil";

const propTypes = {
	members: PropTypes.array.isRequired,
	currentRole: PropTypes.string,
	deleteMember: PropTypes.func.isRequired,
	editMemberRole: PropTypes.func.isRequired
};
export default class MembersContent extends BasicComponent {

	constructor() {
		super();
		this.state = {selected: {}};
	}
	handleAfterRendering(): void {
		initModal();
	}
	requestToDeleteMember(member: User, index: number): void {
		SweetAlert.show(SweetAlert.warningConfirmAlertBuilder("Warning!", "Are you sure?", "Remove",
			() => {this.props.deleteMember(member, index)}));
	}

	render() {
		const _this = this;
		const members = _this.props.members;
		const isAdminRole: boolean = _this.props.currentRole === ApplicationConstant.role.ADMIN;
		const isManagerRole: boolean = _this.props.currentRole === ApplicationConstant.role.MANAGER;
		return (
			<div className="row el-element-overlay">
				{
					members.map((item, index) => {
						const member = item.member;
						return (
							<div key={index} className="col-lg-3 col-md-6">
								<div className="card">
									<div className="el-card-item">
										<div className="el-card-avatar el-overlay-1"> <img src={ApplicationUtil.getFullImageURL(member.avatar)} alt="member" />
											<div className="el-overlay">
												<ul className="el-info">
													<li><a className="btn default btn-outline image-popup-vertical-fit" href={ApplicationUtil.getFullImageURL(member.avatar)}><i className="fa fa-search"/></a></li>
													<li><Link className="btn default btn-outline" to={`/usr/${member.id}`}><i className="fa fa-link"/></Link></li>
													{
														isAdminRole ?
															<li><a className="btn default btn-outline md-trigger" data-modal="modal-edit-member-role" onClick={()=>{this.changeStateValue("selected", item)}}><i className="fa fa-edit"/></a></li>
														: ""
													}
													{
														(isAdminRole || (isManagerRole && (item.roleName === ApplicationConstant.role.MEMBER))) ?
															<li><a className="btn default btn-outline" onClick={()=>_this.requestToDeleteMember(member, index)}><i className="fa fa-trash"/></a></li>
														: ""
													}
												</ul>
											</div>
										</div>
										<div className="el-card-content">
											<h4 className="box-title">{member.firstName} {member.lastName}</h4> <small>{member.career}</small>
											<br/>
										</div>
									</div>
								</div>
							</div>
						)
					})
				}
				<div className="col-lg-3 col-md-6">
					<div className="card">
						<div className="el-card-item">
							<div className="el-card-avatar el-overlay-1"> <img src="http://eliteadmin.themedesigner.in/demos/bt4/assets/images/users/1.jpg" alt="user" />
								<div className="el-overlay">
									<ul className="el-info">
										<li><a className="btn default btn-outline image-popup-vertical-fit" href="http://eliteadmin.themedesigner.in/demos/bt4/assets/images/users/1.jpg"><i className="fa fa-search"/></a></li>
										<li><a className="btn default btn-outline" href="/"><i className="fa fa-link"/></a></li>
									</ul>
								</div>
							</div>
							<div className="el-card-content">
								<h4 className="box-title">Genelia Deshmukh</h4> <small>Managing Director</small>
								<br/> </div>
						</div>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
					<div className="card">
						<div className="el-card-item">
							<div className="el-card-avatar el-overlay-1"> <img src="http://eliteadmin.themedesigner.in/demos/bt4/assets/images/users/2.jpg" alt="user" />
								<div className="el-overlay">
									<ul className="el-info">
										<li><a className="btn default btn-outline image-popup-vertical-fit" href="http://eliteadmin.themedesigner.in/demos/bt4/assets/images/users/1.jpg"><i className="fa fa-search"/></a></li>
										<li><a className="btn default btn-outline" href="/"><i className="fa fa-link"/></a></li>
									</ul>
								</div>
							</div>
							<div className="el-card-content">
								<h4 className="box-title">Genelia Deshmukh</h4> <small>Managing Director</small>
								<br/> </div>
						</div>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
					<div className="card">
						<div className="el-card-item">
							<div className="el-card-avatar el-overlay-1"> <img src="http://eliteadmin.themedesigner.in/demos/bt4/assets/images/users/3.jpg" alt="user" />
								<div className="el-overlay">
									<ul className="el-info">
										<li><a className="btn default btn-outline image-popup-vertical-fit" href="http://eliteadmin.themedesigner.in/demos/bt4/assets/images/users/1.jpg"><i className="icon-magnifier"></i></a></li>
										<li><a className="btn default btn-outline" href="/"><i className="icon-link"/></a></li>
									</ul>
								</div>
							</div>
							<div className="el-card-content">
								<h4 className="box-title">Genelia Deshmukh</h4> <small>Managing Director</small>
								<br/> </div>
						</div>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
					<div className="card">
						<div className="el-card-item">
							<div className="el-card-avatar el-overlay-1"> <img src="http://eliteadmin.themedesigner.in/demos/bt4/assets/images/users/4.jpg" alt="user" />
								<div className="el-overlay">
									<ul className="el-info">
										<li><a className="btn default btn-outline image-popup-vertical-fit" href="http://eliteadmin.themedesigner.in/demos/bt4/assets/images/users/1.jpg"><i className="icon-magnifier"></i></a></li>
										<li><a className="btn default btn-outline"><i className="icon-link"/></a></li>
									</ul>
								</div>
							</div>
							<div className="el-card-content">
								<h4 className="box-title">Genelia Deshmukh</h4> <small>Managing Director</small>
								<br/> </div>
						</div>
					</div>
				</div>
				<ModalEditMemberRole editMemberRole={this.props.editMemberRole} selected={this.state.selected}/>
			</div>
		)
	}
}
MembersContent.propTypes = propTypes;