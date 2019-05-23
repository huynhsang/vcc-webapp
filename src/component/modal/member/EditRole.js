import React from 'react';
import PropTypes from "prop-types";
import BasicComponent from "../../../common/abstract/component/BasicComponent";
import {closeModal} from "../../../common/util/ModalJqueryUtil";
import ApplicationConstant from "../../../common/constant/ApplicationConstant";

const propTypes = {
	selected: PropTypes.object.isRequired,
	editMemberRole: PropTypes.func.isRequired
};
export default class ModalEditMemberRole extends BasicComponent {

	onSubmit(): void {
		if (this.refs.role.value) {
			this.props.editMemberRole(this.props.selected.member, this.refs.role.value);
			this.props.selected.roleName = this.refs.role.value;
			closeModal();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selected.roleName) {
			this.refs.role.value = nextProps.selected.roleName;
		}
	}

	render() {
		return (
			<div>
				<div className="md-modal md-effect-7" id="modal-edit-member-role">
					<div className="md-content">
						<div className="modal-header">
							<button className="md-close close">&times;</button>
							<h4 className="modal-title">Edit member role</h4>
						</div>
						<div className="modal-body">
							<div className="filter-block">
								<div className="form-group">
									<label>Select Role:</label>
									<select className="form-control" ref="role">
										<option value={ApplicationConstant.role.ADMIN}>Admin</option>
										<option value={ApplicationConstant.role.MANAGER}>Manager</option>
										<option value={ApplicationConstant.role.MEMBER}>Member</option>
									</select>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary" onClick={() => this.onSubmit()}>
								Edit
							</button>
						</div>
					</div>
				</div>
				<div className="md-overlay-second"/>
			</div>
		)
	}
}
ModalEditMemberRole.propTypes = propTypes;