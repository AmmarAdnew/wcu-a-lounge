import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "scrollreveal";

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Initialize ScrollReveal
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '60px',
      duration: 1000,
      delay: 200,
      reset: true
    });

    // Apply ScrollReveal to elements
    sr.reveal('.hero-title', { delay: 200 });
    sr.reveal('.hero-description', { delay: 400 });
    sr.reveal('.hero-buttons', { delay: 600 });

    // Play video after component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error attempting to play video:", error
);
      });
    }

  }, []);

  return (
      <header className="relative flex items-center justify-center h-screen mb-12 overflow-hidden">
        <div className="relative z-30 p-5 text-2xl text-white bg-transparent bg-opacity-50 rounded-xl">
          <div>
            {/* Hero Section */}
            <div className="bg-transparent mt-10">
              <div className="container bg-transparent mx-auto flex flex-col items-center py-12 sm:py-24">
                <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
                  <h1 className="hero-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
                    Welcome to <span className="text-primary-light">A-Plus Lounge</span>
                  </h1>
                  
<p className="hero-description  mt-5 sm:mt-10 lg:w-10/12 text-black font-normal text-center text-sm sm:text-lg">
                    Experience the finest dining and lounge atmosphere in town. Our menu is crafted with the freshest ingredients, and our hot drinks are to perfection. Join us for an unforgettable experience.
                  </p>
                </div>
                <div className="hero-buttons flex justify-center items-center">
                  <Link to="/user" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-primary-light transition duration-150 ease-in-out hover:bg-black lg:text-xl lg:font-bold rounded text-white px-4 sm:px-10 border border-primary-light py-2 sm:py-4 text-sm">
                    Get Started
                  </Link>
                  <Link to='/Menu' className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-transparent transition duration-150 ease-in-out hover:border-indigo-600 lg:text-xl lg:font-bold hover:text-primary-light rounded border border-indigo-700 text-indigo-700 px-4 sm:px-10 py-2 sm:py-4 text-sm">
                    View Menu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <video ref={videoRef} autoPlay loop muted className="absolute opacity-70 z-10 mt-10 w-auto min-w-full min-h-full max-w-none">
            <source src="/samsung-galaxy-slow-reveal.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video> */}
      </header>
  );
};

export default Hero;
