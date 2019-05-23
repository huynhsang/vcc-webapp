//Import for unAuthLink
import ForgotPassword from '../../../user/container/forgot_password/ForgotPasswordImpl';
import Login from '../../../user/container/signin_up/LoginImpl';
import Registration from '../../../user/container/signin_up/RegistrationImpl';
//Import for AuthLink
import IndexImpl from "../../../landing_page/container/IndexImpl";

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
	// {
	// 	path: '/',
	// 	exact: true,
	// 	component: Home
	// },
];

export const PublicLink = [
    {
        path: '/index',
        component: IndexImpl
    },
];