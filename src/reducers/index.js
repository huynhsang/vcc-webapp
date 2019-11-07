/**
 * Root Reducer
 */

import App from './app';
import alertState from './sweetAlert';
import home from './home';
import questionDetail from './questionDetail';
import questionsReducer from './questions';
import userInfos from './userInfos';

const reducers = {
    App,
    alertState,
    home,
    questionDetail,
    questionsReducer,
    userInfos
};

export default reducers;
