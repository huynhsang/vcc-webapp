// const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

export const getDefaultFields = () => [
    'id',
    'avatar',
    'firstName',
    'lastName',
    'numberOfQuestions',
    'numberOfAnswers',
    'numberOfBestAnswers',
    'points',
    'level'
];

export const questionsFilterGenerator = ({
    order = null,
    skip = 0,
    limit = 5,
    // include = [
    //     {
    //         relation: 'askedBy',
    //         scope: {
    //             fields: getDefaultFields()
    //         }
    //     }
    // ],
    // where = {
    //     created: {
    //         gt: new Date(Date.now() - ONE_MONTH)
    //     }
    // }
}) => ({
    order,
    skip,
    limit,
    // include,
    // where
});

// order
// numberOfViews DESC
// numberOfAnswers DESC