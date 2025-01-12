import Footer from "../components/Footer";
import ContactUs from "../components/Sections/ContactUs";
import Feature from "../components/Sections/Feature";
import Feature2 from "../components/Sections/Feature2";
import Hero from "../components/Sections/Hero";
import Testimonial from "../components/Sections/Testimonial";
import Navbar from "./../components/NavBar";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Feature/>
      <Feature2/>
      <Testimonial/>
      <ContactUs/>
      <Footer />
    </>
  );
};

export default LandingPage;
