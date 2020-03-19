/**
 * Root Reducer
 */

import App from './app';
import home from './home';
import questionDetail from './questionDetail';
import questionsReducer from './questions';
import userInfos from './userInfos';
import alertConfirm from './alertConfirm';

const reducers = {
    App,
    home,
    questionDetail,
    questionsReducer,
    userInfos,
    alertConfirm
};

export default reducers;
