import http from './https';
import { normalize } from 'normalizr';

const EXPERIENCE_URL = 'experiences';

export async function getExperiences(params) {
  const response = await http.get(EXPERIENCE_URL, { params });
  return response.data;
}

export async function createExperience(data) {
  const response = await http.post(EXPERIENCE_URL, data);
  return response.data;
}

export async function editExperience(data) {
    const response = await http.put(EXPERIENCE_URL, data);
    return response.data;
  }
  
  