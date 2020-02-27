import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './configureStore';

// NOTE: this should be imported before any other project file
// otherwise i18next will not be initialized (particularly  when
// used directly via i18next.t as in services)
import './services/localize';

import './style.css';

import 'easymde/dist/easymde.min.css';

// Component
import { App } from './modules/App';
import { unregister } from './serviceWorker';

// Link and init language manager
import './services/localize';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();
