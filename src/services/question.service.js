import http from './https';
import { normalize } from 'normalizr';
import { setUrlWithToken } from '../utils/url';
import { questionsEntity } from '../constants/schemas';

const QUESTION_URL = 'questions';
const ANSWER_URL = 'answers';
const VOTE_QUESTION_URL = (id) => `questions/${id}/vote`;

export async function getQuestions(params) {
    const url = setUrlWithToken(QUESTION_URL);
    const response = await http.get(url, { params });
    const objReturn = normalize(response.data, questionsEntity);
    if (params && params.totalCount) {
        objReturn.count = parseInt(response.headers['x-total-count'], 10) || 0;
    }
    return objReturn;
}

export async function getQuestionWithSlug(slug, params) {
    const url = setUrlWithToken(`${QUESTION_URL}/${slug}`);
    const response = await http.get(url, { params });
    return response.data;
}

export async function createQuestion(data) {
    const url = setUrlWithToken(QUESTION_URL);
    const response = await http.post(url, data);
    return response.data;
}

export async function editQuestion(data) {
    const response = await http.put(QUESTION_URL, data);
    return response.data;
}

export async function approveAnswer(questionId, answerId) {
    const url = setUrlWithToken(`${QUESTION_URL}/${questionId}/approveAnswer`);

    const response = await http.post(url, { answerId });
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

export async function getNumberQuestions(params) {
    const response = await http.get(`${QUESTION_URL}/count`, {
        params
    });
    return response.data;
}

export async function deleteQuestion(id, history) {
    const url = setUrlWithToken(`${QUESTION_URL}/${id}`);
    const response = await http.delete(url);
    history.push('/topics');
    return response.data;
}

export async function deleteAnswer(id) {
    const url = setUrlWithToken(`${ANSWER_URL}/${id}`);
    const response = await http.delete(url);
    return response.data;
}