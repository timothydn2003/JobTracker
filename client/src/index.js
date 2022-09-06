import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { JobContextProvider } from './context/jobContext';
import { AuthContextProvider } from './context/authContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthContextProvider>
    <JobContextProvider>
      <App />
    </JobContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
