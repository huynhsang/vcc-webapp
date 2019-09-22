import Home from '../../../home/container/HomeContainer';
import { AddQuestion } from '../../../AddQuestion';
import UserProfile from '../../../User/UserProfile/UserProfileImpl';
import UserAbout from '../../../User/UserProfile/UserAbout';

import {UserRouter} from '../../../User';


export const UnAuthLink = [
    {
        path: '/user',
        component: UserRouter
    },
];

export const AuthLink = [
    {
        path: '/question/add',
        component: AddQuestion
    }
];

export const PublicLink = [
    // {
    //     path: '/index',
    //     component: IndexImpls
    // },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/user-profile/:id',
        component: UserProfile,
        subRoutes: [
            {
                path: '',
                exact: true,
                component: UserAbout
            }
        ]
    }
];
