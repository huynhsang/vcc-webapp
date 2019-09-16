import AccountJWTService from '../../modules/user/service/AccountJWTService';
import Result from '../../global/Result';
import RootScope from '../../global/RootScope';
import {
    failedAuthenticationFn,
    isAuthenticatedFn,
} from '../../actions/appAuth';
import CoreService from '../../global/CoreService';

const accountService = CoreService.accountService;

export const getCurrentUser = () => {
    return AccountJWTService.getAccount(RootScope.token, RootScope.userId)
        .then((res: Result) => {
            if (res.isSuccess()) {
                RootScope.currentUser = res.data;
                return RootScope.currentUser;
            } else {
                return RootScope.resetAuthValues();
            }
        })
        .catch(() => {
            return RootScope.resetAuthValues();
        });
};

export const updateApplicationAfterAuthenticated = () => dispatch => {
    if (RootScope.currentUser) {
        dispatch(isAuthenticatedFn());
    } else {
        dispatch(failedAuthenticationFn());
    }
};

export const searchUserByEmail = (email: string) => {
    return accountService.findOneByEmail(email).then((res: Result) => {
        if (res.isSuccess()) {
            return res.data;
        } else {
            return null;
        }
    });
};
