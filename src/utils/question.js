import { getIdAndToken } from '../utils/cookie-tools';
// const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

// order
// numberOfViews DESC
// numberOfAnswers DESC

export const DEFAULT_LIMIT = 6;

const orderMaps = {
    'recent-questions': 'recent',
    'most-answered': 'mostAnswered',
    'most-visited': 'mostVisited',
    'most-voted': 'highVote',
    'no-answers': 'noAnswers'
};

export const setUpQuestionFilter = ({
    category,
    show,
    page,
    text,
    tags,
    askme,
    mime,
    noanswer
}) => {
    const filterObj = {};
    const filterFixed = {};
    let hasError = false;

    const { id } = getIdAndToken();

    if (id && askme === 'true' && mime === 'true') {
        filterFixed.askme = false;
        filterFixed.mime = false;
        hasError = true;
    } else {
        if (id && mime === 'true') {
            filterObj.ownerId = id;
        } else if (id && askme === 'true') {
            filterObj.askedToMe = true;
        }
    }

    if (noanswer === 'true') {
        filterObj.answered = false;
    }

    if (orderMaps[show]) {
        filterObj.sort = orderMaps[show];
        filterFixed.show = show;
    } else if (show) {
        hasError = true;
    }

    if (page && !isNaN(page * 1)) {
        const pageNumber = page * 1;
        filterObj.skip = (pageNumber - 1) * DEFAULT_LIMIT;
        filterObj.limit = DEFAULT_LIMIT;
        filterFixed.page = page;
    } else {
        hasError = true;
        filterFixed.page = '1';
    }

    if (text) {
        filterObj.keyword = text;
        filterFixed.text = text;
    }

    if (category) {
        filterObj.categorySlug = category || '';
        filterFixed.category = category || '';
    }

    if (tags) {
        filterObj.tagIds = tags.split(',');
        filterFixed.tags = tags;
    }

    return hasError ? { filterFixed } : { filter: filterObj };
};
