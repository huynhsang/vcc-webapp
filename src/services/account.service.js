import http from './https';
import { REALM } from '../constants/constants';

import CookieHelper from '../common/util/CookieHelper';
import CookieConstant from '../common/constant/CookieConstant';
import RootScope from '../global/RootScope';

const LOGIN_URL = 'users/login';
const REGISTER_URL = 'users/register';

const EMAIL_VERIFICATION_URL = (uid, token) =>
    `users/confirm?uid=${uid}&token=${token}`;

const RESET_PASSWORD_URL = 'users/reset';

const SET_NEW_PASSWORD_URL = token =>
    `users/reset-password?access_token=${token}`;

export const setUserCookie = (tokenId, userId, rememberMe) => {
    const { maxExDay, minExDay, jwtTokenName, userIdKey } = CookieConstant;
    RootScope.token = tokenId;
    RootScope.userId = userId;
    const exdays = rememberMe ? maxExDay : minExDay;
    CookieHelper.setCookie(jwtTokenName, RootScope.token, exdays);
    CookieHelper.setCookie(userIdKey, RootScope.userId, exdays);
};

export async function login(data) {
    const response = await http.post(LOGIN_URL, { realm: REALM.user, ...data });
    const { id, userId, rememberMe } = response.data;
    setUserCookie(id, userId, rememberMe);
    return response.data;
}

export async function verifyEmail(uid, token) {
    const url = EMAIL_VERIFICATION_URL(uid, token);
    const response = await http.get(url);
    return response.data;
}

export async function register(data) {
    const response = await http.post(REGISTER_URL, data);
    return response.data;
}

export async function resetPassword(email) {
    const response = await http.post(RESET_PASSWORD_URL, { email });
    return response.data;
}

export async function setNewPassword(token, newPassword) {
    const response = await http.post(SET_NEW_PASSWORD_URL(token), {
        newPassword
    });
    return response.data;
}
