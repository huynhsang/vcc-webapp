import http from './https';
import CookieConstant from '../common/constant/CookieConstant';
import CookieHelper from '../common/util/CookieHelper';

const { getCookie } = CookieHelper;
const { jwtTokenName, userIdKey } = CookieConstant;

const GET_USER_URL = 'users';

const getIdAndToken = () => ({
    id: getCookie(userIdKey),
    token: getCookie(jwtTokenName)
});

export async function fetchUserFromCookie() {
    const { id, token } = getIdAndToken();
    if (id && token) {
        const httpResponse = await http.get(
            `${GET_USER_URL}/${id}?access_token=${token}`
        );
        return httpResponse.data;
    } 
        
    throw new Error('Missing id cookie');
    
}

export async function updateUser(data) {
    const { id, token } = getIdAndToken();
    if (id && token) {
        const httpResponse = await http.patch(
            `${GET_USER_URL}/${id}?access_token=${token}`,
            data
        );
        return httpResponse.data;
    } 

    throw new Error('Missing id cookie');
}
