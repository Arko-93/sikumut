import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/commit-mono';
import '@fontsource/commit-mono/700.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);