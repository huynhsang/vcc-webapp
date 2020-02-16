const proxy = require('http-proxy-middleware');

const { REACT_APP_SOCIAL_LOGIN_API_URL } = process.env;

module.exports = function(app) {
    app.use(
        '/auth',
        proxy({
            target: "https://api-staging.vcnc.app",
            changeOrigin: true,
            logLevel: 'debug'
        })
    );
};