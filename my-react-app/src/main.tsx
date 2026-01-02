import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/UserContext';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element with id "root" not found');
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);