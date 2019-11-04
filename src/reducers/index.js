/**
 * Root Reducer
 */

import App from './app';
import alertState from './sweetAlert';
import home from './home';
import questionDetail from './questionDetail';
import questionsReducer from './questions';

const reducers = {
    App,
    alertState,
    home,
    questionDetail,
    questionsReducer
};

export default reducers;
