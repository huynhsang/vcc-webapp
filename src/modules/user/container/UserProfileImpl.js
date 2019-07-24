import connect from "react-redux/es/connect/connect";
import UserProfile from "../component/UserProfile";
import CoreService from "../../../global/CoreService";
import Result from "../../../global/Result";

const accountService = CoreService.accountService;

const getProfileById = function(userId, _this: UserProfile) {
    return () => {
        accountService.findOneById(userId).then((result: Result) => {
            if (result.success) {
                _this.changeStateValue('profile', result.data);
            } else {
                window.location = '/';
            }
        })
    }
};

const UserProfileImpl = connect(
    null,
    { getProfileById }
)(UserProfile);
export default UserProfileImpl;
