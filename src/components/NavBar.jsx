import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "scrollreveal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Initialize ScrollReveal
    const sr = ScrollReveal({
      origin: "top",
      distance: "60px",
      duration: 1000,
      delay: 200,
      reset: false,
    });

    // Apply ScrollReveal to elements
    sr.reveal(".navbar-logo", { delay: 200 });
    sr.reveal(".navbar-signup", { delay: 400 });
    sr.reveal(".navbar-admin", { delay: 600 });
    sr.reveal(".navbar-links", { delay: 600, interval: 200 });
  }, []);

  return (
    <nav className="bg-white z-50 top-0 left-0 md:fixed w-full border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="" className="navbar-logo flex items-center space-x-3 rtl:space-x-reverse">
          <img src="logo.png" className="h-10" alt="" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            - Plus
          </span>
        </a>

        {/* Buttons */}
        <div className="navbar-logo flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link
            to="/User"
            className="navbar-signup text-white bg-primary-light hover:bg-white mr-1 hover:text-primary-light transition-all duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-700"
          >
            Sign Up
          </Link>
          <Link
            to="/admin"
            className="navbar-admin text-primary-light bg-transparent border border-indigo-700 hover:bg-white ml-1 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:text-primary-light transition-all duration-300 ease-in-out focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-700"
          >
            Admin
          </Link>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div
          className={`items-center justify-between w-full z-20 md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-cta"
        >
          <ul className="navbar-links flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 md:p-0 text-gray-900 bg-primary-400 rounded md:bg-transparent md:text-primary-500 md:dark:text-primary-400"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/app"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-400 md:dark:hover:text-primary-300 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                App
              </Link>
            </li>
            <li>
              <Link
                to="/Menu"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-400 md:dark:hover:text-primary-300 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Menu
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;