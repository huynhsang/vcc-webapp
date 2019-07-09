import connect from "react-redux/es/connect/connect";
import UserProfile from "../../user/component/UserProfile";

const UserProfileImpl = connect(
    null,
    { }
)(UserProfile);
export default UserProfileImpl;
