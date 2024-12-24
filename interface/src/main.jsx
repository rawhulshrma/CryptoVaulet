import React from 'react'; // Explicit import for React (best practice)
import { createRoot } from 'react-dom/client'; // React DOM's modern API
import './index.css'; // Global styles
import App from './App.jsx'; // Main App component

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found!'); // Error handling for missing root element
}
