//Import for unAuthLink
import ForgotPassword from '../../../user/container/forgot_password/ForgotPasswordImpl';
import Login from '../../../user/container/signin_up/LoginImpl';
import Registration from '../../../user/container/signin_up/RegistrationImpl';
//Import for AuthLink
import IndexImpl from "../../../landing_page/container/IndexImpl";
import Home from "../../../home/container/HomeImpl";
import MainPage from "../../../home/container/MainPageImpl";
import ViewQuestion from "../../../question_answer/container/ViewQuestionImpl";
import AddQuestion from "../../../question_answer/container/AddQuestionImpl";

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
        path: '/question/add',
        component: AddQuestion,
    }
];

export const PublicLink = [
    {
        path: '/index',
        component: IndexImpl
    },
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
                path: '/question/:name/view',
                exact: true,
                component: ViewQuestion
            }
        ]
    },
    {
        path: '/question/:name/view',
        component: Home,
        subRoutes: [
            {
                path: '',
                exact: true,
                component: ViewQuestion
            }
        ]
    },
];