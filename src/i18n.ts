// src/i18n.ts
'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'

import translationEN from '@/../public/locale/en/common.json'
import translationTH from '@/../public/locale/th/common.json'

const resources = {
  en: { translation: translationEN },
  th: { translation: translationTH },
}

if (!i18n.isInitialized) {
  i18n
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    })
}

export default i18n
