import http from './https';
import { normalize } from 'normalizr';
import { setUrlWithToken } from '../utils/url';
import { postsEntity } from '../constants/schemas';

const POST_URL = 'posts';

export async function getPots(params) {
    const url = setUrlWithToken(POST_URL);
    const response = await http.get(url, { params });
    const objReturn = normalize(response.data, postsEntity);
    // if (params && params.totalCount) {
    //     objReturn.count = parseInt(response.headers['x-total-count'], 10) || 0;
    // }
    return objReturn;
}

export async function createPost(data) {
    const url = setUrlWithToken(POST_URL);
    const response = await http.post(url, data);
    return response.data;
}

export async function editPost(data) {
    const response = await http.put(POST_URL, data);
    return response.data;
} 