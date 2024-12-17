import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { setDoc, collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'


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

    const handleReadMore = (item) => {
        setSelectedItem(item); // Set the item whose description will be shown in the modal
    };

    const toggleModal = (item = null) => {
        if (item) {
            setNewItem(item.Name);
            setNewPrice(item.Price);
            setNewDescription(item.Description);
            setNewCategory(item.Category || "");
            setEditingItemId(item.id); // Set the ID for editing
            setStatus(true); // Edit mode
        } else {
            // Reset fields for creating a new item
            setNewItem("");
            setNewPrice(0);
            setNewDescription("");
            setNewCategory("");
            setEditingItemId(null); // Reset ID
            setStatus(false); // Create mode
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
            console.error('Error setting up real-time listener:', error);
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
            });
            setIsModalOpen(false); // Close modal after adding
            getMenuItems(); // Refresh the list
        } catch (error) {
            console.log(error);
        }
    }

    const deleteItem = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const itemDoc = doc(db, 'MenuItems', id);
                await deleteDoc(itemDoc);
                alert('Item deleted successfully!');
                getMenuItems();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
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
            await updateDoc(itemDoc, {
                Name: newItem,
                Price: newPrice,
                Category: newCategory,
                Description: newDescription,
                image: selectedImage,
            });

            alert("Item updated successfully!");
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
            <div className="flex flex-col md:flex-row justify-between items-center px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg rounded-lg mt-3 mx-2">
                <h1 className="text-3xl font-bold tracking-wide">Menu Management</h1>



                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4 p-4">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 w-full sm:w-auto rounded-lg text-black border border-gray-300 focus:ring-2 focus:ring-blue-300"
                    />

                    {/* Category Filter */}
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 w-full sm:w-auto rounded-lg text-black border border-gray-300 focus:ring-2 focus:ring-blue-300"
                    >
                        <option>All Categories</option>
                        <option>Food</option>
                        <option>Drinks</option>
                    </select>
                </div>

                <button
                    onClick={() => toggleModal()}
                    className="fixed bottom-6 right-6 text-white bg-green-500 hover:bg-green-600 rounded-full px-6 py-3"
                >
                    Add Item
                </button>
            </div>

            {/* Modal Start */}
            <div className="px-4 overflow-y-auto ">

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 overflow-y-auto">
                        <div className="relative p-4 w-full max-w-md">
                            {/* Modal Content */}
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-h-screen overflow-y-auto">
                                {/* Modal Header */}
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {Status ? "Update Item" : "Create New Item"}
                                    </h3>
                                    <button
                                        onClick={() => {
                                            toggleModal();
                                            setStatus(false);
                                        }}
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {/* Modal Body */}
                                <form onSubmit={(e) => { Status ? updateitem(e) : AddNewItem(e); }} className="p-4 md:p-5">
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2">
                                            <label
                                                htmlFor="name"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={newItem}
                                                onChange={(e) => setNewItem(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Type item name"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <div>
                                                <label
                                                    htmlFor="price"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Price
                                                </label>
                                                <input
                                                    type="number"
                                                    id="price"
                                                    value={newPrice}
                                                    onChange={(e) => setNewPrice(Number(e.target.value))}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="$2999"
                                                    required
                                                />

                                            </div>
                                            {/* NEW: Category */}
                                            <select
                                                value={newCategory}
                                                onChange={(e) => setNewCategory(e.target.value)}
                                                className="w-full p-2 mb-3 border rounded"
                                            >
                                                <option value="">Select Category</option>
                                                <option value="Food">Food</option>
                                                <option value="Drinks">Drinks</option>
                                            </select>
                                        </div>
                                        <div className="col-span-2">
                                            <label
                                                htmlFor="description"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Product Description
                                            </label>
                                            <textarea
                                                id="description"
                                                rows="4"
                                                value={newDescription}
                                                onChange={(e) => setNewDescription(e.target.value)}
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Write product description here"
                                            />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label
                                                htmlFor="price"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Upload Image
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            />
                                            <span className='text-green'>{uploadStatus}</span>
                                            {selectedImage && (
                                                <div>
                                                    <h3>Preview:</h3>
                                                    <img
                                                        src={selectedImage}
                                                        alt="Uploaded"
                                                        style={{ width: "300px", marginTop: "10px" }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        onClick={(e) => {

                                            Status ? updateitem() : AddNewItem();
                                        }}
                                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        <svg
                                            className="me-1 -ms-1 w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {Status ? "Update Item" : "Add new product"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Display filtered items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 m-3">
                {filteredItems.map((item) => (
                    <div
                        key={item.id} // Use a unique key for each item
                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                        <a>
                            <img
                                className="rounded-t-lg object-cover w-full h-48"
                                src={
                                    item.image
                                        ? item.image
                                        : `data:image/png;base64,${item.image}`
                                } // Use the Base64 image string
                                alt={item.Name}
                            />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {item.Name}
                                </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {item.Description.length > 25 ? (
                                    <>
                                        {item.Description.substring(0, 100)}...
                                        <button
                                            onClick={() => handleReadMore(item)}
                                            className="text-blue-500 underline ml-2"
                                        >
                                            Read More
                                        </button>
                                    </>
                                ) : (
                                    item.Description
                                )}
                            </p>
                            <p className="mb-3 font-normal text-gray-200 dark:text-gray-200">Category: {item.Category}</p>
                            <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                ETB {item.Price}
                            </h3>
                            <div className="flex justify-evenly mt-4">
                                <button
                                    onClick={() => {
                                        setEditingItemId(item.id); // Track the item being edited
                                        toggleModal(item); // Open modal with item details
                                    }}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteItem(item.id)}
                                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {selectedItem && (
                    <div
                        id="default-modal"
                        tabindex="-1"
                        aria-hidden="true"
                        className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50"
                    >
                        <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {selectedItem.Name}
                                </h3>
                                <button
                                    onClick={() => setSelectedItem(null)} // Close modal
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5 space-y-4">
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    {selectedItem.Description}
                                </p>
                            </div>
                            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    onClick={() => setSelectedItem(null)} // Close modal
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MenuDashboard
