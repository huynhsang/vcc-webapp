/**
 * Root Reducer
 */

// Import Reducers
import App from './app';
import AlertState from './sweetAlert';

// Combine all reducers into one root reducer
const reducers = {
	App,
	AlertState
};

export default reducers;
