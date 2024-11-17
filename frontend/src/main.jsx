import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx'; // Assurez-vous de ne l'importer qu'une seule fois
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from './context/AuthContext.jsx';
import Modal from 'react-modal';

// Définir l'élément racine de l'application pour react-modal
Modal.setAppElement('#root'); // Assurez-vous que l'ID #root correspond à l'élément racine de votre application

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContainer 
          theme="dark" 
          position="top-right" 
          autoClose={3000}
          closeOnClick 
          pauseOnHover={false} 
        />
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
