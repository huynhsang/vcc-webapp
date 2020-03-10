// const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

export const getDefaultFields = () => [
    'id',
    'avatar',
    'firstName',
    'lastName',
    'numberOfQuestions',
    'answerCount',
    'numberOfBestAnswers',
    'points',
    'level'
];

export const questionsFilterGenerator = ({
    order = null,
    skip = 0,
    limit = 6
}) => ({
    order,
    skip,
    limit
});

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

export const setUpQuestionFilter = ({ category, show, page, text, tags }) => {
    const filterObj = {};
    const filterFixed = {};
    let hasError = false;

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

    filterObj.category = category || '';
    filterFixed.category = category || '';

    if (tags) {
        filterObj.tagIds = tags.split(',');
        filterFixed.tags = tags;
    }

    return hasError ? { filterFixed } : { filter: filterObj };
};
