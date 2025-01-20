import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  setDoc,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import MenuCard from "./MenuCard";
import ItemModal from "./ItemModal";
import SelectedItemModal from "./SelectedItemModal";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MenuDashboard = () => {
  const [Status, setStatus] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);

  // File Upload
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  // adding new Item
  const [newItem, setNewItem] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [filteredItems, setFilteredItems] = useState([]);

  // NEW: Search and Category Filter State
  const [searchTerm, setSearchTerm] = useState(""); // Holds search term
  const [filterCategory, setFilterCategory] = useState("All Categories");

  const [Items, setItems] = useState([]);

  const menuItemsCollectionRef = collection(db, "MenuItems");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null); // Track selected item for modal

  const MySwal = withReactContent(Swal);

  const handleReadMore = (item) => {
    setSelectedItem(item); // Set the item whose description will be shown in the modal
  };

  const toggleModal = (item = null) => {
    if (item) {
      // Edit mode: Set fields with the item's data
      setNewItem(item.Name);
      setNewPrice(item.Price);
      setNewDescription(item.Description);
      setNewCategory(item.Category || "");
      setSelectedImage(item.image || null); // Set the image if it exists
      setEditingItemId(item.id);
      setStatus(true); // Edit mode
    } else {
      // Add mode: Reset all fields
      setNewItem("");
      setNewPrice(0);
      setNewDescription("");
      setNewCategory("");
      setSelectedImage(null); // Reset the image
      setEditingItemId(null);
      setUploadStatus("");
      setStatus(false); // Add mode
    }
    setIsModalOpen(!isModalOpen);
  };

  const getMenuItems = () => {
    try {
      // Set up a real-time listener
      const unsubscribe = onSnapshot(menuItemsCollectionRef, (snapshot) => {
        const filteredData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setItems(filteredData); // Update the state with real-time data
      });

      // Optionally return the unsubscribe function to stop listening
      return unsubscribe;
    } catch (error) {
      console.error("Error setting up real-time listener:", error);
    }
  };

  useEffect(() => {
    getMenuItems();
  }, []);

  // NEW: Update filtered items based on search and category filters
  useEffect(() => {
    let filtered = Items;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (filterCategory !== "All Categories") {
      filtered = filtered.filter((item) => item.Category === filterCategory);
    }

    // Update the filtered items
    setFilteredItems(filtered);
  }, [searchTerm, filterCategory, Items]); // Dependency array includes Items, searchTerm, and filterCategory

  const AddNewItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(menuItemsCollectionRef, {
        Name: newItem,
        Price: newPrice,
        Category: newCategory,
        Description: newDescription,
        image: selectedImage,
        isAvailable: true,
      });

      Swal.fire({
        title: "Item Created!",
        text: "Item has been Created successfully.",
        icon: "success",
      });
      setIsModalOpen(false); // Close modal after adding
      // getMenuItems(); // Refresh the list
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    if (
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const itemDoc = doc(db, "MenuItems", id);
            await deleteDoc(itemDoc);
            // alert("Item deleted successfully!");
            // getMenuItems();
          } catch (error) {
            console.error("Error deleting item:", error);
          }

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      })
    ) {
    }
  };

  const updateitem = async (e) => {
    e.preventDefault();
    try {
      if (!editingItemId) {
        alert("No item selected for editing!");
        return;
      }

      const itemDoc = doc(db, "MenuItems", editingItemId);

      // Create an object with only the fields that have changed
      const updatedFields = {};
      if (newItem) updatedFields.Name = newItem;
      if (newPrice !== undefined) updatedFields.Price = newPrice;
      if (newCategory) updatedFields.Category = newCategory;
      if (newDescription) updatedFields.Description = newDescription;
      if (selectedImage) updatedFields.image = selectedImage;

      // Update only the changed fields
      await updateDoc(itemDoc, updatedFields);

      Swal.fire({
        title: "Item Updated!",
        text: "Item has been updated successfully.",
        icon: "success",
      });
      setStatus(false);
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Convert image file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const base64String = await convertToBase64(file);
      setSelectedImage(base64String);
      setUploadStatus("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadStatus("Failed to upload image.");
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-2 bg-gradient-to-r from-primary-dark to-primary text-white shadow-lg rounded-lg mt-4 mx-4">
        {/* Title */}
        <h1 className="text-3xl font-bold tracking-wide font-poppins text-shadow">
          Menu Management
        </h1>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 pl-10 rounded-lg text-gray-900 bg-white border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="w-5 h-5 text-gray-500" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="relative flex-1">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full sm:w-48 px-4 py-2 pl-10 rounded-lg text-gray-900 bg-white border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option>All Categories</option>
              <option>Food</option>
              <option>Drinks</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>

        <button
        onClick={() => {
          toggleModal(); // Open the modal
          setStatus(false); // Set the modal to "add mode"
        }}
        className="fixed bottom-4 right-4 z-[5] text-white bg-secondary hover:bg-secondary-dark rounded-full px-6 py-3 shadow-lg transition-colors flex items-center"
      >
        <FaPlus className="mr-2" /> Add Item
      </button>
      
      </div>


      {/* Modal Start */}
      <div className="px-4 overflow-y-auto ">
        {/* Modal */}
        <ItemModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          Status={Status}
          newItem={newItem}
          setNewItem={setNewItem}
          newPrice={newPrice}
          setNewPrice={setNewPrice}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          selectedImage={selectedImage}
          handleImageUpload={handleImageUpload}
          uploadStatus={uploadStatus}
          updateitem={updateitem}
          AddNewItem={AddNewItem}
          setStatus={setStatus}
        />
      </div>

      {/* Display filtered items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 m-3">
        {filteredItems.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            handleReadMore={handleReadMore}
            toggleModal={toggleModal}
            deleteItem={deleteItem}
          />
        ))}

        {selectedItem && (
          <SelectedItemModal
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        )}
      </div>
      
    </div>
  );
};

export default MenuDashboard;