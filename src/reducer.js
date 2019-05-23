/**
 * Root Reducer
 */
import {combineReducers} from 'redux'
// Import Reducers
import AppAuth from './modules/app/reducer/App'
import AlertState from './component/sweet_alert/reducer/SweetAlert';

// Combine all reducers into one root reducer
export default combineReducers({
	AppAuth,
	AlertState
})
