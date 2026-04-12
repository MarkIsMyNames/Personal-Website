import './i18n/i18n';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { ROOT_ELEMENT_ID } from './config';
import { ErrorMessage } from './types';

const rootElement = document.getElementById(ROOT_ELEMENT_ID);
if (!rootElement) {
  throw new Error(ErrorMessage.RootElementNotFound);
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
