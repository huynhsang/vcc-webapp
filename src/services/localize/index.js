import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import moment from 'moment';
// NOTE: en is imported by default
import 'moment/locale/vi';
// NOTE: make sure the last loaded language is the same as the first one used by i18n
// so that the same default is used for text and dates

import en from './en_strings';
import vi from './vi_strings';

const detectionOptions = {
    order: ['cookie', 'localStorage', 'navigator'],
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    cache: ['cookie', 'localStorage'],

    cookieMinute: 10,
    cookieDomain: process.env.REACT_APP_DOMAIN_NAME
};


i18next
    .use(LanguageDetector) // for using browser auto detection
    .use(initReactI18next) // for using with React components (note that Provider is no longer needed)
    .init({
        // we init with resources
        resources: {
            en: { translations: en },
            vi: { translations: vi }
        },
        detection: detectionOptions,
        load: 'languageOnly',
        fallbackLng: {
            default: ['en', 'vi']
        },
        whitelist: ['en', 'vi'],
        nonExplicitWhitelist: true,
        debug: process.env.NODE_ENV !== 'production',

        // have a common namespace used around the full app
        ns: ['translations'],
        defaultNS: 'translations',

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false, // not needed for react
            formatSeparator: ','
        },

        react: {
            wait: true,
            nsMode: 'fallback',
        }
    });

i18next.on('languageChanged', lng => {
    moment.locale(lng);
});

// this is required in order to be able to use i18next.t outside a react component
i18next.t = i18next.t.bind(i18next);

export default i18next;
