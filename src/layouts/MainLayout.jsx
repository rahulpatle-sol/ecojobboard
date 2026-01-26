import React from 'react';
import { useLocation } from 'react-router-dom';
import {FooterSection } from '../view/public/Footer'
import {NavBar}         from '../view/public/NavBar'
const MainLayout = ({ children }) => {
  const location = useLocation();
  
  // Jin paths par Navbar/Footer nahi chahiye unhe yahan dalo
  const hideControls = 
    location.pathname.startsWith('/Dashboard') || 
    location.pathname.startsWith('/assessment') ||
    location.pathname.startsWith('/verify-otp');

  return (
    <>
      {!hideControls && <NavBar/>}
      <main>{children}</main>
      {!hideControls && <FooterSection />}
    </>
  );
};

export default MainLayout;