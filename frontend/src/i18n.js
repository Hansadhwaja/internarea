
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import translationPT from './locales/pt/translation.json';
import translationHI from './locales/hi/translation.json';
import translationFR from './locales/fr/translation.json';
import translationZH from './locales/zh/translation.json';


const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  },
  pt: {
    translation: translationPT
  },
  hi: {
    translation: translationHI
  },
  fr: {
    translation: translationFR
  },
  zh: {
    translation: translationZH
  }
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: 'en', 
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
