import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LngDetector from 'i18next-browser-languagedetector';
import { isEmpty } from 'lodash';

import en from './en_strings';
import vi from './vi_strings';

const detectionOptions = {
  order: ['cookie', 'localStorage', 'navigator'],
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  cache: ['cookie', 'localStorage'],

  cookieMinute: 10,
  cookieDomain: process.env.DOMAIN_NAME,
};

const resources = {
  en: {
    translation: {
      ...en,
    },
  },
  vi: {
    translation: {
      ...vi,
    },
  },
};

i18n
  .use(LngDetector) // detect user language
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    detection: detectionOptions,
    load: 'languageOnly',
    fallbackLng: {
      default: ['en', 'vi'],
    },
    whitelist: ['en', 'vi'],
    nonExplicitWhitelist: true,
    // debug: process.env.NODE_ENV === 'development',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

async function changePlayerLanguage(language: string) {
  if (isEmpty(language)) {
    return;
  }

  await i18n.changeLanguage(language);
}

export { i18n, changePlayerLanguage };
