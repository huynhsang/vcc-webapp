import http from './https';
import { setUrlWithToken } from '../utils/url';

const ANSWER_URL = 'answers';
const VOTE_ANSWER_URL = id => `answers/${id}/vote`;

export async function createAnswer(questionId, body) {
    const url = setUrlWithToken(ANSWER_URL);
    const response = await http.post(url, { questionId, body });
    return response.data;
}

export async function editAnswer(data) {
    const url = setUrlWithToken(ANSWER_URL);
    const response = await http.put(url, data);
    return response.data;
}

export async function voteAnswer(id, action) {
    const url = setUrlWithToken(VOTE_ANSWER_URL(id));
    const response = await http.post(url, { action });
    return response.data;
}

export async function getAnswers(params) {
    const response = await http.get(ANSWER_URL, { params });
    return response.data;
}

export async function getNumberAnswers(params) {
    const response = await http.get(`${ANSWER_URL}/count`, {
        params
    });
    return response.data;
}
