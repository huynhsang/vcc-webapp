import { getIdAndToken } from './cookie-tools';

export const setUrlWithToken = url => {
    const { token } = getIdAndToken();
    return `${url}?access_token=${token}`;
};
