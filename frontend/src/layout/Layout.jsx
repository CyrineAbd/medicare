import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Routers from '../routes/Routers'; // Corrected import path

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </>
  );
};

export default Layout;