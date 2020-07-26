import http from './https';
import { setUrlWithToken } from '../utils/url';

const POST_URL = 'posts';

export async function getPosts(params) {
    console.log(params);

    const url = setUrlWithToken(POST_URL);
    const response = await http.get(url, { params: {...params, totalCount: true} });
    return response.data;
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
    const response = await http.put(POST_URL, data);
    return response.data;
}
