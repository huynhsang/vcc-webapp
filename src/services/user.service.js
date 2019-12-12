import http from './https';
import { setUrlWithToken } from '../utils/url';
import { getIdAndToken } from '../utils/cookie-tools';

const GET_USER_URL = 'users';
const CHANGE_USER_PASSWORD_URL = 'users/change-password';

export async function fetchUserFromCookie() {
    const { id, token } = getIdAndToken();

    if (id && token) {
        const url = setUrlWithToken(`${GET_USER_URL}/${id}`);
        const httpResponse = await http.get(url);
        return httpResponse.data;
    }

    throw new Error('Missing id cookie');
}

export async function getUser(id) {
    const response = await http.get(`${GET_USER_URL}/${id}`);
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

export async function changeUserPassword({ oldPassword, newPassword }) {
    const url = setUrlWithToken(CHANGE_USER_PASSWORD_URL);
    const httpResponse = await http.post(url, { oldPassword, newPassword });
    return httpResponse.data;
}
