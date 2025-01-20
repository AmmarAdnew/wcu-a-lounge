import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";

const Feature = () => {
  useEffect(() => {
    // Initialize ScrollReveal
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '60px',
      duration: 1000,
      delay: 200,
      reset: true,
    });

    // Apply ScrollReveal to elements
    sr.reveal('.feature-title', { delay: 200 });
    sr.reveal('.feature-description', { delay: 400 });
    sr.reveal('.feature-buttons', { delay: 600 });
    sr.reveal('.feature-image', { delay: 800, origin: 'right' });
  }, []);

  return (
    <section className="bg-white rounded-t-2xl dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="feature-title max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Check Out Our{" "}
            <span className="text-primary-DEFAULT">Real-Time Menu</span>
          </h1>
          <p className="feature-description max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Join us at A-Plus Lounge for a dining experience that’s as unique as
            you are. We’ve got something for everyone. Come for the food, stay
            for the vibe!
          </p>
          <div className="feature-buttons">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Click Here
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              A-Plus Menu
            </a>
          </div>
        </div>
        <div className="feature-image hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Restaurant Menu"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Feature;