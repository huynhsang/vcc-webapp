const proxy = require('http-proxy-middleware');

const { REACT_APP_API_URL } = process.env;

module.exports = function(app) {
    app.use(
        '/auth',
        proxy({
            target: `${REACT_APP_API_URL}`,
            changeOrigin: true
        })
    );
};
