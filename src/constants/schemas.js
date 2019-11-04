import { schema } from 'normalizr';

export const questionEntity = new schema.Entity(
    'questions',
    {},
    {
        idAttribute: 'id'
    }
);

export const questionsEntity = [questionEntity];