import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the import path as needed

const MenuCard = ({ item, handleReadMore, toggleModal, deleteItem }) => {
  const toggleAvailability = async () => {
    try {
      const itemDoc = doc(db, "MenuItems", item.id);
      await updateDoc(itemDoc, {
        isAvailable: !item.isAvailable, // Toggle the boolean value
      });
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };

  return (
    <div
      className={`max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700 ${
        !item.isAvailable ? "opacity-80" : "" // Apply opacity if item is disabled
      }`}
    >
      {/* Image Section */}
      <div className="relative h-48 w-full">
        <img
          className="w-full h-full object-cover"
          src={item.image || "https://via.placeholder.com/300"} // Fallback image if item.image is null
          alt={item.Name}
        />
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">Unavailable</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.Name}
        </h5>

        {/* Description */}
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {item.Description.length > 100 ? (
            <>
              {item.Description.substring(0, 100)}...
              <button
                onClick={() => handleReadMore(item)}
                className="text-primary-light hover:text-primary-dark underline ml-2"
              >
                Read More
              </button>
            </>
          ) : (
            item.Description
          )}
        </p>

        {/* Category and Price */}
        <div className="flex justify-between items-center mb-4">
          <span className="bg-primary-light text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
            {item.Category}
          </span>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            ETB {item.Price}
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-2">
          <button
            onClick={() => toggleModal(item)}
            className="flex-1 text-white bg-primary-dark hover:bg-primary-light focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-lg text-sm px-4 py-2.5 text-center transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => deleteItem(item.id)}
            className="flex-1 text-white bg-red-400 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-accent-light font-medium rounded-lg text-sm px-4 py-2.5 text-center transition-colors"
          >
            Delete
          </button>
          <button
            onClick={toggleAvailability}
            className={`flex-1  ${
              item.isAvailable
                ? " text-secondary-light  hover:bg-secondary-dark hover:text-white"
                : "bg-yellow-600 text-white hover:bg-yellow-700 "
            } focus:ring-4 focus:outline-none focus:ring-secondary-light font-medium rounded-lg text-sm px-4 py-2.5 text-center transition-colors`}
          >
            {item.isAvailable ? "Disable" : "Enable"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;