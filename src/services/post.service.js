import http from './https';
import { setUrlWithToken } from '../utils/url';

const POST_URL = 'posts';

export async function getPosts(params) {
    const url = setUrlWithToken(POST_URL);
    const response = await http.get(url, {
        params: { ...params, totalCount: true }
    });
    return {
        data: response.data,
        count: parseInt(response.headers['x-total-count'], 10) || 0
    };
}

export async function getPost(id) {
    const url = setUrlWithToken(`${POST_URL}/${id}`);
    const response = await http.get(url);
    return response.data;
}

export async function createPost(data) {
    const url = setUrlWithToken(POST_URL);
    const response = await http.post(url, data);
    return response.data;
}

export async function editPost(data) {
    const url = setUrlWithToken(`Posts`);
    const response = await http.put(url, data);
    return response.data;
}

export async function deletePost(id) {
    const url = setUrlWithToken(`${POST_URL}/${id}`);
    const response = await http.delete(url);
    return response.data;
}
