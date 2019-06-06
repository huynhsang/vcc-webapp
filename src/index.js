import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {configureStore} from './store';
import './static/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import './static/Scss/styles.scss';
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
