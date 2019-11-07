import http from './https';
import { setUrlWithToken } from '../utils/url';
import { normalize } from 'normalizr';
import { experiencesEntity } from '../constants/schemas';

const EXPERIENCE_URL = 'experiences';

export async function getExperiences(params) {
    const response = await http.get(EXPERIENCE_URL, { params });
    return normalize(response.data, experiencesEntity);
}

export async function createExperience(data) {
    const url = setUrlWithToken(EXPERIENCE_URL);
    const response = await http.post(url, data);
    return response.data;
}

export async function editExperience(data) {
    const response = await http.put(EXPERIENCE_URL, data);
    return response.data;
}
