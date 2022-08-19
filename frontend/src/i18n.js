import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import {initReactI18next} from 'react-i18next'
import LocalStorageBackend from 'i18next-localstorage-backend';
import HttpApi from 'i18next-http-backend';

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: '/assets/i18n/{{ns}}/{{lng}}.json'
        },
        fallbackLng: 'lot',
        debug: false,
        ns: ['common'],
        interpolation: {
            escapeValue:false,
        },   
    })

export default i18n