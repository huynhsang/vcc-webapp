import http from './https';

const EDUCATION_URL = 'education';

export async function getEducation(params) {
  const response = await http.get(EDUCATION_URL, { params });
  return response.data;
}

export async function createEducation(data) {
  const response = await http.post(EDUCATION_URL, data);
  return response.data;
}

export async function editEducation(data) {
  const response = await http.put(EDUCATION_URL, data);
  return response.data;
}
