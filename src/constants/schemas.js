import { schema } from 'normalizr';

export const questionEntity = new schema.Entity(
    'questions',
    {},
    {
        idAttribute: 'id'
    }
);

export const questionsEntity = [questionEntity];

export const educationEntity = new schema.Entity(
    'educations',
    {},
    {
        idAttribute: 'id'
    }
);

export const educationsEntity = [educationEntity];

export const experienceEntity = new schema.Entity(
    'experiences',
    {},
    {
        idAttribute: 'id'
    }
);

export const experiencesEntity = [experienceEntity];

export const answerEntity = new schema.Entity(
    'answers',
    {},
    {
        idAttribute: 'id'
    }
);

export const answersEntity = [answerEntity];
