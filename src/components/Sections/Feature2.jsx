import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";

const Feature2 = () => {
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
    sr.reveal('.feature2-title', { delay: 200 });
    sr.reveal('.feature2-description', { delay: 400 });
    sr.reveal('.feature2-buttons', { delay: 600 });
    sr.reveal('.feature2-image', { delay: 800, origin: 'left' });
  }, []);

  return (
    <section className="bg-gradient-to-r from-black to-gray-800 dark:from-gray-800 dark:to-gray-900">
      <div className="gap-8 items-center py-12 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-20 lg:px-6">
        <div className="feature2-image hidden md:block">
          {/* <img
            className="w-full block dark:hidden rounded-lg shadow-xl"
            src="https://images.unsplash.com/photo-1512621776951-5a9479c8a3c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Delicious food"
          /> */}
          <img
            className="w-full rounded-lg shadow-xl"
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Delicious food"
          />
        </div>
        <div className="mt-4 md:mt-0">
          <h2 className="feature2-title mb-4 text-2xl md:text-5xl tracking-tight font-extrabold text-white dark:text-gray-200 leading-tight">
            Craving Something? Order Now!
          </h2>
          <p className="feature2-description mb-6 font-light text-gray-500 md:text-lg dark:text-gray-300">
            Get your favorite meals and order with our app. Browse our
            delicious selection, customize your order, and enjoy a hassle-free
            dining experience.
          </p>
          <div className="feature2-buttons flex space-x-4">
            <a
              href="#"
              className="inline-flex items-center text-white hover:text-primary-dark bg-primary-light hover:bg-neutral-light focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-yellow-900 transition-all duration-300 ease-in-out"
            >
              Order Now
              <svg
                className="ml-2 -mr-1 w-5 h-5"
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
          </div>
        </div>
        <div className="feature2-image block md:hidden">
          <img
            className="w-full dark:hidden rounded-lg shadow-xl"
            src="https://images.unsplash.com/photo-1512621776951-5a9479c8a3c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Delicious food"
          />
          <img
            className="w-full hidden mt-10 dark:block rounded-lg shadow-xl"
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Delicious food"
          />
        </div>
      </div>
    </section>
  );
};

export default Feature2;