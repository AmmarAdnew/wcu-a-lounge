import React from 'react'
import Navbar from '../components/NavBar'
import MenuSection from '../components/Sections/MenuSection'
import ContactUs from '../components/Sections/ContactUs'
import Footer from '../components/Footer'

const MenuPage = () => {
  return (
    <>
      <Navbar />
      <MenuSection />
      <ContactUs />
      <Footer />
    </>
  );
};

export default MenuPage;