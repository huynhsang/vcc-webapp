import { createAction } from 'redux-starter-kit';
import actionsNames from '../constants/action-names.constant';

const { SHOW_LOGIN_CONFIRM } = actionsNames;

export const showLoginConfirmFn = createAction(SHOW_LOGIN_CONFIRM);
