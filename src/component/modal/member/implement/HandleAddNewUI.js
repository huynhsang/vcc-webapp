import ModalAddNewMember from "../AddNew";
import AccountUtil from "../../../../common/util/AccountUtil";
import ApplicationConstant from "../../../../common/constant/ApplicationConstant";

export function searchUserToAddMemberByEmail(email: String, _this: ModalAddNewMember): void {
	AccountUtil.searchUserByEmail(email).then(res => {
		_this.changeStateValue("user", res);
	})
}

export function toggleRole(currentRole: string, _this: ModalAddNewMember): void {
	if (currentRole === ApplicationConstant.role.MEMBER) {
		_this.changeStateValue("role", ApplicationConstant.role.MANAGER);
		return;
	}
	_this.changeStateValue("role", ApplicationConstant.role.MEMBER);
}