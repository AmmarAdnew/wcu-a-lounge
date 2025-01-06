import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaUpload, FaSave, FaEdit, FaPlus } from "react-icons/fa"; // FontAwesome icons
import { MdCategory, MdDescription, MdAttachMoney } from "react-icons/md"; // Material Design icons

const ItemModal = ({
  isModalOpen,
  toggleModal,
  Status,
  newItem,
  setNewItem,
  newPrice,
  setNewPrice,
  newCategory,
  setNewCategory,
  newDescription,
  setNewDescription,
  selectedImage,
  handleImageUpload,
  uploadStatus,
  updateitem,
  AddNewItem,
  setStatus,
}) => {
  // Animation variants for the modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  // Animation variants for the backdrop
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 overflow-y-auto"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="relative p-4 w-full max-w-md"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Modal Content */}
            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-800 max-h-screen overflow-y-auto custom-scrollbar">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {Status ? "Update Item" : "Create New Item"}
                </h3>
                <button
                  onClick={() => {
                    toggleModal();
                    setStatus(false);
                  }}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <FaTimes className="w-5 h-5" /> {/* Close icon */}
                </button>
              </div>

              {/* Modal Body */}
              <form
                onSubmit={(e) => (Status ? updateitem(e) : AddNewItem(e))}
                className="p-6"
              >
                <div className="grid gap-6 mb-6 grid-cols-2">
                  {/* Name Input */}
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type item name"
                        required
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEdit className="text-gray-500" /> {/* Edit icon */}
                      </div>
                    </div>
                  </div>

                  {/* Price and Category */}
                  <div className="col-span-2">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Price Input */}
                      <div className="flex-1">
                        <label
                          htmlFor="price"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Price
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            id="price"
                            value={newPrice}
                            onChange={(e) => setNewPrice(Number(e.target.value))}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="ETB 2999"
                            required
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MdAttachMoney className="text-gray-500" /> {/* Money icon */}
                          </div>
                        </div>
                      </div>

                      {/* Category Dropdown */}
                      <div className="flex-1">
                        <label
                          htmlFor="category"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Category
                        </label>
                        <div className="relative">
                          <select
                            id="category"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          >
                            <option value="">Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Drinks">Drinks</option>
                          </select>
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MdCategory className="text-gray-500" /> {/* Category icon */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description Input */}
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Description
                    </label>
                    <div className="relative">
                      <textarea
                        id="description"
                        rows="4"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Write product description here"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                        <MdDescription className="text-gray-500" /> {/* Description icon */}
                      </div>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="col-span-2">
                    <label
                      htmlFor="image"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Upload Image
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUpload className="text-gray-500" /> {/* Upload icon */}
                      </div>
                    </div>
                    {/* Upload Status */}
                    {uploadStatus && (
                      <p
                        className={`mt-2 text-sm ${
                          uploadStatus.includes("successfully")
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {uploadStatus}
                      </p>
                    )}
                    {/* Image Preview */}
                    {selectedImage && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 flex justify-center"
                      >
                        <div className="text-center">
                          <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                          <img
                            src={selectedImage}
                            alt="Uploaded"
                            className="max-w-full h-auto rounded-lg shadow-md"
                            style={{ maxWidth: "300px" }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full text-white bg-primary-DEFAULT hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
                >
                  {Status ? (
                    <>
                      <FaSave className="inline-block mr-2" /> {/* Save icon */}
                      Update Item
                    </>
                  ) : (
                    <>
                      <FaPlus className="inline-block mr-2" /> {/* Add icon */}
                      Add New Product
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ItemModal;