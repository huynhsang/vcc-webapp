/**
 * Root Reducer
 */

import App from './app';
import questionDetail from './questionDetail';
import questionsReducer from './questions';
import userInfos from './userInfos';
import alertConfirm from './alertConfirm';

const reducers = {
    App,
    questionDetail,
    questionsReducer,
    userInfos,
    alertConfirm
};

export default reducers;
