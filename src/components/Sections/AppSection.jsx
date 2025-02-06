import React, { useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";

const AppSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Initialize ScrollReveal
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '60px',
      duration: 1000,
      delay: 200
,
      reset: true,
    });

    // Apply ScrollReveal to elements
    sr.reveal('.app-tagline', { delay: 200 });
    sr.reveal('.app-heading', { delay: 400 });
    sr.reveal('.app-description', { delay: 600 });
    sr.reveal('.app-button', { delay: 800 });

    // Play video after component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error
("Error attempting to play video:", error);
      });
    }
  }, []);

  return (
//     <header className="relative flex items-center justify-center h-screen mb-12 overflow-hidden">
//         <div className="relative z-30 p-5 text-2xl text-white bg-transparent bg-opacity-50 rounded-xl">
//           <div>
//             {/* Hero Section */}
//             <div className="bg-transparent mt-10">
//               <div className="container bg-transparent mx-auto flex flex-col items-center py-12 sm:py-24">
//                 <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
//                   <h1 className="hero-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
//                     Welcome to <span className="text-primary-light">A-Plus Lounge</span>
//                   </h1>
                  
// <p className="hero-description mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">
//                     Experience the finest dining and lounge atmosphere in town. Our menu is crafted with the freshest ingredients, and our hot drinks are to perfection. Join us for an unforgettable experience.
//                   </p>
//                 </div>
//                 <div className="hero-buttons flex justify-center items-center">
//                   <Link to="/user" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-primary-light transition duration-150 ease-in-out hover:bg-black lg:text-xl lg:font-bold rounded text-white px-4 sm:px-10 border border-primary-light py-2 sm:py-4 text-sm">
//                     Get Started
//                   </Link>
//                   <Link to='/Menu' className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-transparent transition duration-150 ease-in-out hover:border-indigo-600 lg:text-xl lg:font-bold hover:text-primary-light rounded border border-indigo-700 text-indigo-700 px-4 sm:px-10 py-2 sm:py-4 text-sm">
//                     View Menu
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <video ref={videoRef} autoPlay loop muted className="absolute z-10 mt-10 w-auto min-w-full min-h-full max-w-none">
//             <source src="/samsung-galaxy-slow-reveal.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//         </video>
//       </header>

<section className="relative flex items-center justify-center h-screen mb-12 overflow-hidden">

  <div className="relative z-30 p-5 text-2xl text-white bg-transparent bg-opacity-50 rounded-xl">
    <div className="z-30 relative max-w-3xl mx-auto text-center">
      {/* Tagline */}
      <p className="app-tagline inline-flex px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-full font-pj">
        Your Cravings, Just a Tap Away.
      </p>

      {/* Heading */}
      <h1 className="app-heading mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
        Discover Your City's Best Flavors
      </h1>

      {/* Description */}
      <p className="app-description max-w-md mx-auto mt-6 text-base leading-7 text-gray-800 font-inter">
        Explore a wide variety of dishes, order from whereever you are and enjoy a delicious dining experience.
      </p>

      {/* Button with Gradient Animation */}
      <div className="app-button relative inline-flex mt-10 group">
        <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

        <a
          href="/A-Plus.apk"
          title="Download A-Plus App"
          className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          role="button"
          download
        >
          DOWNLOAD THE A-PLUS APP
        </a>
      </div>
    </div>
  </div>

  <video ref={videoRef} autoPlay loop muted className="absolute z-10 opacity-50 w-auto min-w-full min-h-full max-w-none">
    <source src="/infinity-pool-display-pan.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</section>
  )
};

export default AppSection;
