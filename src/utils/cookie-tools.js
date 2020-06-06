import { getCookie } from '../utils/CookieHelper';
import {
    JWT_TOKEN_NAME,
    USER_ID_KEY,
    USER_ROLE_KEY
} from '../constants/cookie.constant';

export const getIdAndToken = () => ({
    id: getCookie(USER_ID_KEY),
    token: getCookie(JWT_TOKEN_NAME),
    role: getCookie(USER_ROLE_KEY)
});
