//Import for unAuthLink
import ForgotPassword from '../../../user/container/forgot_password/ForgotPasswordImpl';
import Login from '../../../user/container/signin_up/LoginImpl';
import Registration from '../../../user/container/signin_up/RegistrationImpl';
import EmailVerification from '../../../user/container/email_verification/EmailVerificationImpl';
//Import for AuthLink
// import IndexImpl from "../../../landing_page/container/IndexImpl";
import Home from '../../../home/container/HomeContainer';
import AddQuestion from '../../../question_answer/container/AddQuestionImpl';
import UserProfile from '../../../user/container/UserProfileImpl';
import UserAbout from "../../../user/container/UserAboutlmpl";


export const UnAuthLink = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/registration',
        component: Registration,
    },
    {
        path: '/forgot-password',
        component: ForgotPassword,
    },
    {
        path: '/confirm',
        component: EmailVerification,
    },
];

export const AuthLink = [
    {
        path: '/question/add',
        component: AddQuestion,
    },
];

export const PublicLink = [
    // {
    //     path: '/index',
    //     component: IndexImpl
    // },
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/user-profile',
        component: UserProfile,
        subRoutes: [
            {
                path: '',
                exact: true,
                component: UserAbout
            },
        ]
    },

];
