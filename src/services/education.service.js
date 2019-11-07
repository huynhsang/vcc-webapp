import http from './https';
import { normalize } from 'normalizr';
import { setUrlWithToken } from '../utils/url';

import { educationsEntity } from '../constants/schemas';

const EDUCATION_URL = 'education';

export async function getEducations(params) {
  const response = await http.get(EDUCATION_URL, { params });
  return normalize(response.data, educationsEntity);
}

export async function createEducation(data) {
  const url = setUrlWithToken(EDUCATION_URL);
  const response = await http.post(url, data);
  return response.data;
}

export async function editEducation(data) {
  const url = setUrlWithToken(EDUCATION_URL);
  const response = await http.put(url, data);
  return response.data;
}
