import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './configureStore';

// NOTE: this should be imported before any other project file
// otherwise i18next will not be initialized (particularly  when
// used directly via i18next.t as in services)
import './services/localize';

import './style.css';

import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

// Theme css
import './static/theme/css/style.css';
import './static/theme/css/media-element.css';
import './static/theme/css/custom.css';
import './static/theme/css/sweet-alert.css';

// Our custom css
import './static/Scss/styles.scss';

import 'easymde/dist/easymde.min.css';

// Component
import { App } from './modules/App';
import { unregister } from './serviceWorker';

// Link and init language manager
import './services/localize';

import './static/Scss/default.scss';

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
