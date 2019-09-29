import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './configureStore';
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

// Theme css
import './static/theme/css/style.css';
import './static/theme/css/media-element.css';
import './static/theme/css/custom.css';
import './static/theme/css/sweet-alert.css';

//Import PrimeReact css
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Our custom css
import './static/Scss/styles.scss';

// Component
import { App } from './modules/App';
import * as serviceWorker from './serviceWorker';

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
serviceWorker.unregister();
