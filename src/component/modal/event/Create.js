import React from 'react';
import PropTypes from 'prop-types';
import BasicComponent from '../../../common/abstract/component/BasicComponent';
import {closeModal, initModal} from "../../../common/util/ModalJqueryUtil";
import {dataIsValid, getDateTimeFromInput} from "./implement/HandleCreateModalUI";
import ApplicationUtil from "../../../common/util/ApplicationUtil";
import RootScope from "../../../global/RootScope";
import EventBuilder from "../../../domain/Event";
import type {Event} from "../../../domain/Event";
import EventConstant from "../../../common/constant/EventConstant";
import type {EventBelongs} from "../../../domain/EventBelongs";
import EventBelongsBuilder from "../../../domain/EventBelongs";

const propTypes = {
	createNewEvent: PropTypes.func.isRequired,
	page: PropTypes.object,
	group: PropTypes.object
};
export default class ModalCreateNewEvent extends BasicComponent {

	constructor() {
		super();
		this.state = {
			validation: {},
			privacy: undefined,
			selectedRepeatOption: "None"
		}
	}
	handleAfterTheFirstRender(): void {
		initModal();
		window.initSpecialFormInput();
	}

	onSubmit(): void {
		const privacy: string = this.state.privacy ? this.state.privacy.toLowerCase() : null;
		const repeat: string = this.state.selectedRepeatOption.toLowerCase();
		const cover: string = EventConstant.eventCoverDefault;
		const startDatetime: Date = getDateTimeFromInput(this.refs.startDate.value, this.refs.startTime.value);
		const endDatetime: Date = getDateTimeFromInput(this.refs.endDate.value, this.refs.endTime.value);
		const data: Event = EventBuilder.buildNewEventData(this.refs.name.value.trim(), this.refs.location.value.trim(),
			startDatetime, endDatetime, repeat, this.refs.description.value.trim(), cover, privacy, this.refs.category.value);
		if (dataIsValid(data, this)) {
			const eventBelongs: EventBelongs = EventBelongsBuilder.buildNewData(data, this.props.page, this.props.group);
			this.props.createNewEvent(eventBelongs, this);
			closeModal();
		}
	}

	render() {
		const validation = ApplicationUtil.isEmpty(this.state.validation) ? false : this.state.validation;
		return (
			<div>
				<div className="md-modal md-effect-13" id="modal-create-new-event">
					<div className="md-content">
						<div className="modal-header">
							<button className="md-close close">&times;</button>
							<h4 className="modal-title text-bold">Create a Event</h4>
							<h6>This info will also appear in News Feed and any ads created for this event.</h6>
							<small>It's free to set up. let's get started.</small>
						</div>
						<div className="modal-body">
							<form>
								<div className={(validation && validation.nameIsUnValid) ? "form-group has-error" : "form-group"}>
									<label>Name Event</label>
									<input type="text" className="form-control" ref="name"
										   placeholder="Add a short, clear name"/>
								</div>
								<div className="form-group form-group-select2">
									<label>Choose a category</label>
									<select className="form-control" ref="category">
										{
											EventConstant.categories.map((value, index) => {
												return (
													<option key={index} value={value}>{value}</option>
												)
											})
										}
									</select>
								</div>
								<div className={(validation && validation.locationIsUnValid) ? "form-group has-error" : "form-group"}>
									<label>Location Event</label>
									<input type="text" className="form-control" ref="location"
										   placeholder="Include a place or address"/>
								</div>
								<div className="row">
									<div className="col-lg-6">
										<div className="form-group">
											<label htmlFor="datepickerDate">Start date</label>
											<div className="input-group">
												<span className="input-group-addon"><i className="fa fa-calendar"/></span>
												<input type="text" className="form-control" ref="startDate" id="datepickerDate"/>
											</div>
										</div>
									</div>
									<div className="col-lg-6">
										<div className="form-group">
											<label htmlFor="timepicker">Start time</label>
											<div className="input-group input-append bootstrap-timepicker">
												<input type="text" className="form-control" ref="startTime" id="timepicker"/>
													<span className="add-on input-group-addon"><i className="fa fa-clock-o"/></span>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-lg-6">
										<div className="form-group">
											<label htmlFor="datepickerDate">End date</label>
											<div className="input-group">
												<span className="input-group-addon"><i className="fa fa-calendar"/></span>
												<input type="text" className="form-control" ref="endDate" id="datepickerDateSencond"/>
											</div>
										</div>
									</div>
									<div className="col-lg-6">
										<div className="form-group">
											<label htmlFor="timepicker">End time</label>
											<div className="input-group input-append bootstrap-timepicker">
												<input type="text" className="form-control" ref="endTime" id="timepickerSencond"/>
												<span className="add-on input-group-addon"><i className="fa fa-clock-o"/></span>
											</div>
										</div>
									</div>
								</div>
								{/*<div className="row">
									<div className="col-lg-12">
										<h5><span>Repeat</span></h5>
										<div className="btn-group" data-toggle="buttons">
											{
												EventConstant.repeatValues.map((item, index) => {
													const isActive: boolean = (this.state.selectedRepeatOption === item);
													return (
														<label key={index} className={isActive ? "btn btn-primary active" : "btn btn-primary"} onClick={()=>{this.setState({selectedRepeatOption: item})}}>
															<input type="radio" value={item}/> {item}
														</label>
													)
												})
											}
										</div>
									</div>
									{this.state.selectedRepeatOption === EventConstant.repeatValues[1] ?
										<div className="col-lg-12">
											<div className="form-group">
												<br/>
												<div className="checkbox-nice checkbox-inline">
													<input type="checkbox" id="checkbox-inl-1" />
													<label htmlFor="checkbox-inl-1">
														Mon
													</label>
												</div>
												<div className="checkbox-nice checkbox-inline">
													<input type="checkbox" id="checkbox-inl-2" />
													<label htmlFor="checkbox-inl-2">
														Tue
													</label>
												</div>
												<div className="checkbox-nice checkbox-inline">
													<input type="checkbox" id="checkbox-inl-3" />
													<label htmlFor="checkbox-inl-3">
														Web
													</label>
												</div>
												<div className="checkbox-nice checkbox-inline">
													<input type="checkbox" id="checkbox-inl-4" />
													<label htmlFor="checkbox-inl-4">
														Thu
													</label>
												</div>
												<div className="checkbox-nice checkbox-inline">
													<input type="checkbox" id="checkbox-inl-5" />
													<label htmlFor="checkbox-inl-5">
														Fri
													</label>
												</div>
												<div className="checkbox-nice checkbox-inline">
													<input type="checkbox" id="checkbox-inl-6" />
													<label htmlFor="checkbox-inl-6">
														Sat
													</label>
												</div>
												<div className="checkbox-nice checkbox-inline">
													<input type="checkbox" id="checkbox-inl-7" />
													<label htmlFor="checkbox-inl-7">
														Sun
													</label>
												</div>
											</div>
										</div> : ""
									}
								</div>*/}
								<div className={(validation && validation.privacyIsUnValid) ? "form-group has-error" : "form-group"}>
									<label>Select privacy</label>
									<div style={{position: "relative"}}>
										<input type="text" className="form-control dropdown-toggle" data-toggle="dropdown"
											   placeholder="Select event privacy" value={this.state.privacy} readOnly={true}/>
										<ul className="dropdown-menu">
											{
												EventConstant.privacy.map((item, index) => {
													return (
														<li key={index} onClick={()=>this.changeStateValue("privacy", item.value)}><a>
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
								<div className={(validation && validation.descriptionIsUnValid) ? "form-group has-error" : "form-group"}>
									<label>Description</label>
									<textarea className="form-control" rows="5" ref="description" placeholder="Tell people more about the event"/>
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
ModalCreateNewEvent.contextTypes = RootScope.contextTypesDefault;
ModalCreateNewEvent.propTypes = propTypes;