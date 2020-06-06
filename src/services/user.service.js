import http from './https';
import { setUrlWithToken } from '../utils/url';
import { getIdAndToken } from '../utils/cookie-tools';

import { setUserCookie } from './account.service';
import {
    USER_ROLE_KEY,
    MAX_EXDAY
} from '../constants/cookie.constant';

import { setCookie } from '../utils/CookieHelper';

const GET_USER_URL = 'users';
const GET_USER_PROFILE_URL = 'users/profile';
const GET_USER_BY_LOGIN_TOKEN_URL = token => `users/me?access_token=${token}`;
const CHANGE_USER_PASSWORD_URL = 'users/change-password';

export async function fetchUserFromCookie() {
    const { id, token } = getIdAndToken();

    if (id && token) {
        const url = setUrlWithToken(`${GET_USER_URL}/me/`);
        const httpResponse = await http.get(url);

        const { roles = [] } = httpResponse.data;
        setCookie(USER_ROLE_KEY, roles[0], MAX_EXDAY);

        return httpResponse.data;
    }

    throw new Error('Missing id cookie');
}

export async function getUserProfile(id) {
    const response = await http.get(GET_USER_PROFILE_URL, { params: { id } });
    return response.data;
}

export async function updateUser(data) {
    const { id, token } = getIdAndToken();
    if (id && token) {
        const url = setUrlWithToken(`${GET_USER_URL}/${id}`);
        const httpResponse = await http.patch(url, data);
        return httpResponse.data;
    }

    throw new Error('Missing id cookie');
}

export async function getUsers(params) {
    const response = await http.get(GET_USER_URL, { params });
    return response.data;
}

export async function getUserByLoginToken(token) {
    const response = await http.get(GET_USER_BY_LOGIN_TOKEN_URL(token));
    const { id } = response.data;
    setUserCookie(token, id);
    return response.data;
}

export async function changeUserPassword({ oldPassword, newPassword }) {
    const url = setUrlWithToken(CHANGE_USER_PASSWORD_URL);
    const httpResponse = await http.post(url, { oldPassword, newPassword });
    return httpResponse.data;
}
