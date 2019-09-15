/**
 * Main store function
 */
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';

export const history = createBrowserHistory();

const store = configureStore({
  reducer: {
    router: connectRouter(history),
    ...rootReducer,
  },
  middleware: [...getDefaultMiddleware(), routerMiddleware(history)],
});

export default store;
