import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';
import { UsuarioProvider } from './contexts/UsuarioContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <UsuarioProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      </UsuarioProvider>
    </Router>
  </React.StrictMode>
);
