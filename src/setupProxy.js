const proxy = require('http-proxy-middleware');

const { REACT_APP_SOCIAL_LOGIN_API_URL } = process.env;

module.exports = function(app) {
    app.use(
        '/auth',
        proxy({
            target: REACT_APP_SOCIAL_LOGIN_API_URL,
            changeOrigin: true,
            onProxyReq(proxyReq) {
                if (proxyReq.getHeader('origin')) {
                    proxyReq.setHeader(
                        'origin',
                        REACT_APP_SOCIAL_LOGIN_API_URL
                    );
                }
            },
            logLevel: 'debug'
        })
    );
};
