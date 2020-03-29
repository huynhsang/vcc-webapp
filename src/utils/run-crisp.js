export default () => {
    const { REACT_APP_CRISP_WEBSITE_ID } = process.env;
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = REACT_APP_CRISP_WEBSITE_ID;
    const d = document;
    const s = d.createElement('script');
    s.src = 'https://client.crisp.chat/l.js';
    s.async = 1;
    d.getElementsByTagName('head')[0].appendChild(s);
};
