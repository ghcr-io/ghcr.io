// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global styles for your app
import App from './App'; // Main App component
import { AppProvider } from './AppContext'; // Import AppProvider for Context API

// Create the root element and render the app
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* Wrap the App component with AppProvider to use Context globally */}
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
