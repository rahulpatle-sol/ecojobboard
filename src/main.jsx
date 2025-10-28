// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRoutes from './components/Routes';
import NavBar from './components/NavBar';
import FooterSection from './components/Footer';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <NavBar/>
    <AppRoutes />
   <FooterSection/>
  </BrowserRouter>
);
