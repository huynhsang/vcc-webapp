/**
 * Root Reducer
 */

// Import Reducers
import AppAuth from './appAuth';
import AlertState from './sweetAlert';

// Combine all reducers into one root reducer
const reducers = {
	AppAuth,
	AlertState
};

export default reducers;
