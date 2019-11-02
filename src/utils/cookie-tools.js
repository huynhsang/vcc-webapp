import CookieHelper from '../common/util/CookieHelper';
import CookieConstant from '../common/constant/CookieConstant';

const { getCookie } = CookieHelper;
const { jwtTokenName, userIdKey } = CookieConstant;

export const getIdAndToken = () => ({
    id: getCookie(userIdKey),
    token: getCookie(jwtTokenName)
});
