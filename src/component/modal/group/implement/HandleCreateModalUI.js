import type {Group} from "../../../../domain/Group";
import BasicComponent from "../../../../common/abstract/component/BasicComponent";
import ValidationConstant from "../../../../common/constant/ValidationConstant";
import ApplicationUtil from "../../../../common/util/ApplicationUtil";


export function dataIsValid(data: Group, _this: BasicComponent): boolean {
	let validation = {};
	if (!data.name || data.name.length < ValidationConstant.defaultMinLength) {
		validation.nameIsUnValid = true;
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

export function resetModalGroupData(_this: BasicComponent) {
	_this.setRefsValue("name", '');
	_this.setRefsValue("description", '');
}