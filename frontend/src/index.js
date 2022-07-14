import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from "react-router-dom";
import Store from "./App/store";
import App from "./App";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Provider store={Store}>
                <App/>
            </Provider>
        </Router>
    </React.StrictMode>
);
