import http from './https';

const CATEGORIES_URL = 'categories';

export async function getCategories(params) {
    const response = await http.get(CATEGORIES_URL, { params });
    return response.data;
}
