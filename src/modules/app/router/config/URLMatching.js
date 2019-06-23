//Import for unAuthLink
import ForgotPassword from '../../../user/container/forgot_password/ForgotPasswordImpl';
import Login from '../../../user/container/signin_up/LoginImpl';
import Registration from '../../../user/container/signin_up/RegistrationImpl';
//Import for AuthLink
import IndexImpl from "../../../landing_page/container/IndexImpl";
import Home from "../../../home/container/HomeImpl";
import MainPage from "../../../home/container/MainPageImpl";
import DetailPage from "../../../home/container/DetailPageImpl";

export const UnAuthLink = [
	{
		path: '/login',
		component: Login
	}, {
		path: '/registration',
		component: Registration
	}, {
		path: '/forgot-password',
		component: ForgotPassword
	}
];

export const AuthLink = [
	{
		path: '/',
        exact: true,
		component: Home,
        subRoutes: [
            {
                path: '',
                exact: true,
                component: MainPage
            },
            {
                path: '/question/:name',
                exact: true,
                component: DetailPage
            }
        ]
	},
    {
        path: '/question/:name',
        component: Home,
        subRoutes: [
            {
                path: '',
                exact: true,
                component: DetailPage
            }
        ]
    }
];

export const PublicLink = [
    {
        path: '/index',
        component: IndexImpl
    },
];