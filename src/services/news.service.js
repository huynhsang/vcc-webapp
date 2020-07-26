import http from './https';
import { setUrlWithToken } from '../utils/url';

const NEWS_URL = 'news';

export async function getNews(params) {
    const url = setUrlWithToken(NEWS_URL);
    const response = await http.get(url, { params });
    return response.data;
}

export async function createNews(data) {
    const url = setUrlWithToken(NEWS_URL);
    const response = await http.post(url, data);
    return response.data;
}
