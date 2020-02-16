const proxy = require('http-proxy-middleware');

const { REACT_APP_SOCIAL_LOGIN_API_URL } = process.env;

module.exports = function(app) {
    app.use(
        '/auth/google',
        proxy({
            target: `${REACT_APP_SOCIAL_LOGIN_API_URL}`,
            changeOrigin: true
        })
    );
    app.use(
        '/auth/facebook',
        proxy({
            target: `${REACT_APP_SOCIAL_LOGIN_API_URL}`,
            changeOrigin: true
        })
    );
};
