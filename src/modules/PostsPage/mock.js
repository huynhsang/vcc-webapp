export const postMock = {
    id: 1,
    title: 'Authentication and Authorization in NodeJS GraphQL API',
    slug: 'authentication-and-authorization-in-nodejs-graphql-api',
    body: `Most of GraphQL APIs that are developed are probably not meant for public access without any authorization. Sooner or later you’ll need to somehow limit access to only authenticated users or limit resources so that only allowed users are able to see them.
    In this post, we’ll take a look at how you could implement GraphQL security in applications using NodeJS, Passport and Apollo Server.
    Ways to implement authentication
    There are a few ways you could add access rights to your GraphQL APIs:
    If your requirements are simple, you can just allow all access to logged in users and decline it to the general public. This could be easily done in a context factory (we’ll go through that later on).
    You could check access rights in your resolvers and fine grain it based on requested data, current session and returned objects.
    Move security code into your domain logic and fail there if access should not be granted.
    Add directives to your schema and make security declarative.
    Leave all security to other services if your GraphQL is only a facade to other systems.
    Where to keep security code
    I think, that security is rarely something domain specific but rather part of system infrastructure and does not belong to domain code. Moving it to domain layer would also mean you make it dependent on session data and web application concepts. That’s not what we usually want.
    Keeping it in directives may look very elegant at first, but it makes things really complex if you need something more than simple role-based authorization. You might end up with a brand new DSL on top of GraphQL schema language to get something more from it.
    What we have left is to keep it in GraphQL resolvers and that’s what we’ll focus on in this article. Keeping authorization code there is very elastic and does not pollute your domain logic.`,
    resume: `Most of GraphQL APIs that are developed are probably not meant for public access without any authorization. Sooner or later you’ll need to somehow limit access to only authenticated users or limit resources so that only allowed users are able to see them.
    In this post, we’ll take a look at how you could implement GraphQL security in applications using NodeJS, Passport and Apollo Server.
    Ways to implement authentication
    `,
    mainCharacter: {
        firstName: 'Van A',
        lastName: 'Nguyen',
        company: 'Company abc '
    },
    author: {
        firstName: 'Thi B',
        lastName: 'Tran'
    },
    tagList: [
        {
            slug: 'europe',
            nameEn: 'europe',
            nameVi: 'châu âu',
            questionCount: 5,
            type: 'location',
            id: '5e479d1d07985e4deed4b6ab',
            created: '2020-02-15T07:26:21.577Z',
            modified: '2020-02-15T07:26:21.577Z'
        },
        {
            slug: 'asia',
            nameEn: 'asia',
            nameVi: 'châu á',
            questionCount: 6,
            type: 'location',
            id: '5e479db207985e4deed4b6ad',
            created: '2020-02-15T07:28:50.150Z',
            modified: '2020-02-15T07:28:50.150Z'
        }
    ],
    coverImage: 'https://www.amazeelabs.com/sites/default/files/styles/leading_image/public/pexels-photo.jpg?h=f7d9296c&itok=LzenSsG8',
    created: new Date()
};

export const postsMock = (number) =>
    new Array(number).fill('').map((val, key) => ({ ...postMock, id: key }));
