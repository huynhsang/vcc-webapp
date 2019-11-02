import http from './https';

const TAGS_URL = 'tags';

const TAGS_RELATING_CATEGORY_URL = categorySlug =>
    `categories/${categorySlug}/tags`;

export async function getTags(params) {
    const response = await http.get(TAGS_URL, { params });
    return response.data;
}

export async function getTagList(params) {
    const response = await http.get(`${TAGS_URL}/list`, { params });
    return response.data;
}

export async function getTrendingTags(params) {
    const response = await http.get(`${TAGS_URL}/trending`, {
        params
    });
    return response.data;
}

export async function getTagsRelatingCategory(categorySlug) {
    const response = await http.get(TAGS_RELATING_CATEGORY_URL(categorySlug));
    return response.data;
}
