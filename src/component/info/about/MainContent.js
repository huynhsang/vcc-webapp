import React from 'react';
import PropTypes from 'prop-types';
import BasicComponent from "../../../common/abstract/component/BasicComponent";

const propTypes = {
	data: PropTypes.object.isRequired
};
export default class AboutContent extends BasicComponent {

	render() {
		const data = this.props.data;
		return (
			<div className="main-box clearfix ">
				<header className="main-box-header clearfix">
					<h2>About</h2>
				</header>
				<div className="main-box-body clearfix">
					<div className="table-responsive">
						<table id="user" className="table table-hover" style={{clear: "both"}}>
							<tbody>
							<tr>
								<td width="35%">Created</td>
								<td width="65%"><a className="editable editable-click">{`Started in ${new Date(data.createdDate).getFullYear()}`}</a></td>
							</tr>
							<tr>
								<td>Owned by</td>
								<td><a className="editable editable-click editable-empty">{data.lastModifiedBy}</a></td>
							</tr>
							{
								data.description ?
									<tr>
										<td>Description</td>
										<td><a className="editable editable-click editable-empty">{data.description}</a></td>
									</tr> : <tr><td> </td></tr>
							}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}
AboutContent.propTypes = propTypes;