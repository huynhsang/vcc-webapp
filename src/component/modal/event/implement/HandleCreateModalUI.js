import type {Event} from "../../../../domain/Event";
import BasicComponent from "../../../../common/abstract/component/BasicComponent";
import ValidationConstant from "../../../../common/constant/ValidationConstant";
import ApplicationUtil from "../../../../common/util/ApplicationUtil";


export function dataIsValid(data: Event, _this: BasicComponent): boolean {
	let validation = {};
	if (!data.name || data.name.length < ValidationConstant.defaultMinLength) {
		validation.nameIsUnValid = true;
	}
	if (!data.location || data.location.length < ValidationConstant.defaultMinLength) {
		validation.locationIsUnValid = true;
	}
	if (!data.description || data.description.length < ValidationConstant.defaultDescriptionMinLength) {
		validation.descriptionIsUnValid = true;
	}
	if (!data.privacy) {
		validation.privacyIsUnValid = true;
	}
	_this.changeStateValue("validation", validation);
	return ApplicationUtil.isEmpty(validation);
}

export function getDateTimeFromInput(date: string, time: string): Date {
	let datetime: Date = new Date(date);
	const elements = time.split(':');
	datetime.setHours(elements[0]);
	datetime.setMinutes(elements[1]);
	datetime.setSeconds(elements[2]);
	return datetime;
}