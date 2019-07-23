//Import for unAuthLink
import ForgotPassword from '../../../user/container/forgot_password/ForgotPasswordImpl';
import Login from '../../../user/container/signin_up/LoginImpl';
import Registration from '../../../user/container/signin_up/RegistrationImpl';
import EmailVerification from '../../../user/container/email_verification/EmailVerificationImpl';
//Import for AuthLink
import IndexImpl from "../../../landing_page/container/IndexImpl";
import Home from "../../../home/container/HomeImpl";
import MainPage from "../../../home/container/MainPageImpl";
import ViewQuestion from "../../../question_answer/container/ViewQuestionImpl";
import AddQuestion from "../../../question_answer/container/AddQuestionImpl";
import SubCategory from "../../../sub_category/container/SubCategoryImpl";
import Badges from "../../../badges/container/BadgesImpl"

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
	}, {
        path: '/confirm',
        component: EmailVerification
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
                path: '/question/:identity/view',
                exact: true,
                component: ViewQuestion
            },
            {
                path: '/tags',
                exact: true,
                component: SubCategory
            }
        ]
    },
    {
        path: '/question/:identity/view',
        component: Home,
        subRoutes: [
            {
                path: '',
                exact: true,
                component: ViewQuestion
            }
        ]
    },
    {
        path: '/tags',
        component: Home,
        subRoutes: [
            {
                path: '',
                exact: true,
                component: SubCategory
            }
        ]
    },
    {
        path: '/badges',
        component: Home,
        subRoutes: [
            {
                path: '',
                exact: true,
                component: Badges
            }
        ]
    }

];
