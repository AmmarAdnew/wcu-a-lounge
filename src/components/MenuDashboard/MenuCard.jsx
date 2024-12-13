import React from 'react';
import PropTypes from 'prop-types';

// const MenuCard = ({ image, name, desc, price, onReadMore }) => {

const MenuCard = ({ name, desc, price}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
      <img
        className="w-full h-48 object-cover"
        // src={image}
        alt={name}
      />
      <div className="p-6">
        <h5 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{name}</h5>
        <p className="text-gray-700 dark:text-gray-400 mb-4">{desc}</p>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-indigo-500">ETB {price}</h3>
        </div>
        <button
          onClick={onReadMore}
          className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-800"
        >
          Read More
          <svg
            className="w-4 h-4 ml-2 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

MenuCard.propTypes = {
//   image: PropTypes.string.isRequired, // URL for the image
  name: PropTypes.string.isRequired, // Name of the menu item
  desc: PropTypes.string.isRequired, // Description of the menu item
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Price of the menu item
  onReadMore: PropTypes.func, // Callback for the "Read More" button
};

MenuCard.defaultProps = {
  onReadMore: () => alert('Read more clicked!'),
};

export default MenuCard;






