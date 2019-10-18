import AccountJWTService from '../../services/accountJWT.service';
import Result from '../../global/Result';
import RootScope from '../../global/RootScope';
import { setIsAuthenticatedFn } from '../../actions/app';
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

export const searchUserByEmail = (email: string) => {
    return accountService.findOneByEmail(email).then((res: Result) => {
        if (res.isSuccess()) {
            return res.data;
        } else {
            return null;
        }
    });
};