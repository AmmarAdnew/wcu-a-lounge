import React from "react";
import AppSection from "../components/Sections/AppSection";
import Navbar from "../components/NavBar";
import ContactUs from "../components/Sections/ContactUs";
import Footer from "../components/Footer";

const AppPage = () => {
  return (
    <>
      <Navbar />
      <AppSection />
      <ContactUs />
      <Footer />
    </>
  );
};

export default AppPage;
