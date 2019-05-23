/**
 * Main store function
 */
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'

export function configureStore(initialState = {}) {
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunk)
	)
}
