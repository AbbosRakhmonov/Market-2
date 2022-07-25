import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import Store from './App/store';
import App from './App';
import './index.css';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        supportedLngs: ['uz', 'ru', 'gb'],
        fallbackLng: 'uz',
        detection: {
            order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
            caches: ['cookie'],
        },
        backend: {
            loadPath: '/assets/locales/{{lng}}/translation.json',
        },
        react: {useSuspense: false},
    });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Router>
            <Provider store={Store}>
                <App/>
            </Provider>
        </Router>
        <ToastContainer
            position='top-right'
            theme={'colored'}
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
        />
    </>
);
