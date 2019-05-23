import React from 'react';
import PropTypes from 'prop-types';
import BasicComponent from '../../../common/abstract/component/BasicComponent';
import {closeModal, initModal} from "../../../common/util/ModalJqueryUtil";
import {dataIsValid, resetModalGroupData} from "./implement/HandleCreateModalUI";
import type {Group} from "../../../domain/Group";
import GroupBuilder from "../../../domain/Group";
import ApplicationUtil from "../../../common/util/ApplicationUtil";
import RootScope from "../../../global/RootScope";
import GroupConstant from "../../../common/constant/GroupConstant";

const propTypes = {
	createNewGroup: PropTypes.func.isRequired,
	page: PropTypes.object,
};
export default class ModalCreateNewGroup extends BasicComponent {

	constructor() {
		super();
		this.state = {
			validation: {},
			privacy: undefined
		}
	}

	handleAfterTheFirstRender(): void {
		initModal();
	}

	onSubmit(): void {
		const privacy: string = this.state.privacy ? this.state.privacy.toLowerCase() : null;
		const data: Group = GroupBuilder.buildNewGroupData(this.refs.name.value.trim(), privacy, this.refs.description.value, this.props.page);
		if (dataIsValid(data, this)) {
			this.props.createNewGroup(data, this);
			resetModalGroupData(this);
			closeModal();
		}
	}

	render() {
		const validation = ApplicationUtil.isEmpty(this.state.validation) ? false : this.state.validation;
		return (
			<div>
				<div className="md-modal md-effect-13" id="modal-create-new-group">
					<div className="md-content">
						<div className="modal-header">
							<button className="md-close close">&times;</button>
							<h4 className="modal-title text-bold">Create a Group</h4>
							<h6>Groups are great for getting things done and staying in touch with just the people you
								want. Share photos and videos, have conversations, make plans and more.</h6>
							<small>It's free to set up. let's get started.</small>
						</div>
						<div className="modal-body">
							<form>
								<div
									className={(validation && validation.nameIsUnValid) ? "form-group has-error" : "form-group"}>
									<label>Name Group</label>
									<input type="text" className="form-control" ref="name"
										   placeholder="Enter name group"/>
								</div>
								<div
									className={(validation && validation.privacyIsUnValid) ? "form-group has-error" : "form-group"}>
									<label>Select privacy</label>
									<div style={{position: "relative"}}>
										<input type="text" className="form-control dropdown-toggle"
											   data-toggle="dropdown"
											   placeholder="Select group privacy" value={this.state.privacy}
											   readOnly={true}/>
										<ul className="dropdown-menu">
											{
												GroupConstant.privacy.map((item, index) => {
													return (
														<li key={index}
															onClick={() => this.changeStateValue("privacy", item.value)}>
															<a>
																<i className={item.icon} style={{fontSize: "medium"}}/>
																<div>
																	<strong>{item.value}</strong>
																	<p>{item.description}</p>
																</div>
															</a></li>
													)
												})
											}
										</ul>
									</div>
								</div>
								<div
									className={(validation && validation.descriptionIsUnValid) ? "form-group has-error" : "form-group"}>
									<label>Description</label>
									<textarea className="form-control" rows="5" ref="description"/>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary" onClick={() => this.onSubmit()}>
								Get Started
							</button>
						</div>
					</div>
				</div>
				<div className="md-overlay"/>
			</div>
		)
	}
}
ModalCreateNewGroup.contextTypes = RootScope.contextTypesDefault;
ModalCreateNewGroup.propTypes = propTypes;