
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {configureStore} from './store';
import './static/css/bootstrap3_3_7.min.css';
import './static/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './static/fonts/iconic/css/material-design-iconic-font.min.css';
import './static/css/sweet-alert.css';
import './static/css/modal.css';
import './static/css/theme_styles.css';
import './static/css/datepicker.css';
import './static/css/bootstrap-timepicker.min.css';
import './static/css/my-customization.css';
import Root from './modules/app/container/AppImpl';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

render(
    <Provider store={store}>
      <Root/>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
