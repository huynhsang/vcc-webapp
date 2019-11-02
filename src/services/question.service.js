import http from './https';
import { setUrlWithToken } from '../utils/url';

//Simple fetch functions

const QUESTION_URL = 'questions';
const VOTE_QUESTION_URL = id => `questions/${id}/vote`;

export async function getQuestions(params) {
    const url = setUrlWithToken(QUESTION_URL);
    const response = await http.get(url, { params });
    return response.data;
}

export async function getQuestionWithSlug(slug, params) {
    const response = await http.get(`${QUESTION_URL}/${slug}`, { params });
    return response.data;
}

export async function createQuestion(data) {
    const url = setUrlWithToken(QUESTION_URL);
    const response = await http.post(url, data);
    return response.data;
}

export async function editQuestion(data) {
    const response = await http.put(QUESTION_URL, { data });
    return response.data;
}

export async function approveAnswer(questionId, answerId) {
    const response = await http.post(
        `${QUESTION_URL}/${questionId}/approveAnswer`,
        { data: { answerId } }
    );
    return response.data;
}

export async function getAnswersOfQuestion(questionId, params) {
    const response = await http.get(`${QUESTION_URL}/${questionId}/answers`, {
        params
    });
    return response.data;
}

export async function voteQuestion(id, action) {
    const url = setUrlWithToken(VOTE_QUESTION_URL(id));
    const response = await http.post(url, { action });
    return response.data;
}

export async function reVoteQuestion(questionId, voteId, action) {
    const url = setUrlWithToken(VOTE_QUESTION_URL(questionId));
    const response = await http.put(url, {
        voteId,
        action
    });
    return response.data;
}
