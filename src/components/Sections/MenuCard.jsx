import React, { useState, useEffect } from "react";
import {
  FaUtensils,
  FaGlassMartiniAlt,
  FaTimesCircle,
  FaArrowRight,
} from "react-icons/fa";
import ScrollReveal from "scrollreveal";

const MenuCard = ({ image, title, description, category, isAvailable }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    // Initialize ScrollReveal
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '60px',
      duration: 1000,
      delay: 200,
      reset: true,
    });

    // Apply ScrollReveal to the card
    sr.reveal('.menu-card', { delay: 200 });
  }, []);

  // Truncate the description to 30 characters
  const truncatedDescription =
    description.length > 30 ? `${description.substring(0, 30)}...` : description;

  return (
    <div
      className={`menu-card rounded-xl overflow-y-scroll overflow-hidden shadow-lg flex flex-col custom-scrollbar ${
        !isAvailable ? "opacity-60" : ""
      }`}
      style={{ height: "300px" }} // Fixed height for the card
    >
      <div className="relative flex-grow">
        <a href="#">
          <div className="overflow-hidden">
            <img
              className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-110" // Hover effect
              src={image}
              alt={title}
            />
          </div>
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-10"></div>
        </a>
        <a href="#!">
          <div className="absolute bottom-0 left-0 bg-primary-light px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out flex items-center gap-2">
            {category === "Food" ? (
              <FaUtensils className="text-lg" />
            ) : (
              <FaGlassMartiniAlt className="text-lg" />
            )}{" "}
            {/* Display category icon */}
            {category === "Food" ? "Food" : "Drinks"}
          </div>
        </a>
        {!isAvailable && (
          <div className="absolute top-0 right-0 bg-red-600 px-4 py-2 text-white text-sm flex items-center gap-2">
            <FaTimesCircle className="text-lg" /> Unavailable
          </div>
        )}
      </div>
      <div className="px-6 py-4 flex flex-col flex-grow">
        <a
          href="#"
          className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out"
        >
          {title}
        </a>
        <p className="text-gray-500 text-sm mt-2 flex-grow">
          {showFullDescription ? description : truncatedDescription}{" "}
          {/* Show full or truncated description */}
          {description.length > 60 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-indigo-600 hover:text-indigo-800 ml-1 focus:outline-none flex items-center gap-1"
            >
              {showFullDescription ? "Read Less" : "Read More"}{" "}
              <FaArrowRight
                className={`text-sm transition-transform ${
                  showFullDescription ? "transform rotate-90" : ""
                }`}
              />
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default MenuCard;