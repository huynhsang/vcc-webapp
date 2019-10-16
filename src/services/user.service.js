import http from './https';
import CookieConstant from '../common/constant/CookieConstant';
import CookieHelper from '../common/util/CookieHelper';

const { getCookie } = CookieHelper;
const { jwtTokenName, userIdKey } = CookieConstant;

const GET_USER_URL = 'users';

export async function fetchUserFromCookie() {
    const id = getCookie(userIdKey);
    const token = getCookie(jwtTokenName);
    if (id && token) {
        const httpResponse = await http.get(
            `${GET_USER_URL}/${id}?access_token=${token}`
        );
        return httpResponse.data;
    } else {
        return null;
    }
}
