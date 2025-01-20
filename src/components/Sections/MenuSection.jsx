import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { FaUtensils, FaGlassMartiniAlt } from "react-icons/fa";
import ScrollReveal from "scrollreveal";

const MenuSection = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filter, setFilter] = useState("All"); // State for category filter
  const [itemsToShow, setItemsToShow] = useState(9); // State for number of items to display

  const getMenuItems = () => {
    try {
      const menuItemsCollectionRef = collection(db, "MenuItems"); // Ensure collection name matches Firestore
      const unsubscribe = onSnapshot(menuItemsCollectionRef, (snapshot) => {
        const filteredData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMenuItems(filteredData);
      });
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = getMenuItems();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

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
    sr.reveal('.menu-filter-buttons', { delay: 200, interval: 200  });
    sr.reveal('.menu-grid-item', { delay: 400, interval: 200 });
    sr.reveal('.load-more-button', { delay: 600 });
  }, []);

  // Filter menu items based on the selected category
  const filteredItems = menuItems.filter((item) => {
    if (filter === "All") return true;
    return item.Category === filter;
  });

  // Function to handle "Load More" button click
  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + 9); // Increase the number of items to show by 9
  };

  return (
    <div className="max-w-screen-xl mt-10 mx-auto p-5 sm:p-10 md:p-16">
      {/* Category Filter Buttons */}
      <div className="menu-filter-buttons flex justify-center gap-4 mb-10">
        <button
          onClick={() => {
            setFilter("All");
            setItemsToShow(9); // Reset items to show when changing filter
          }}
          className={`px-4 py-2 rounded-lg ${
            filter === "All" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => {
            setFilter("Food");
            setItemsToShow(9); // Reset items to show when changing filter
          }}
          className={`px-4 py-2 flex items-center gap-2 rounded-lg ${
            filter === "Food" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
        >
          <FaUtensils className="text-lg" /> Food
        </button>
        <button
          onClick={() => {
            setFilter("Drinks");
            setItemsToShow(9); // Reset items to show when changing filter
          }}
          className={`px-4 py-2 flex items-center gap-2 rounded-lg ${
            filter === "Drinks" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
        >
          <FaGlassMartiniAlt className="text-lg" /> Drinks
        </button>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
        {filteredItems.slice(0, itemsToShow).map((item) => (
          <div key={item.id} className="menu-grid-item">
            <MenuCard
              image={item.image} // Pass Base64 image directly
              title={item.Name} // Pass Name
              description={item.Description} // Pass Description
              category={item.Category} // Pass Category
              isAvailable={item.isAvailable} // Pass isAvailable
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {itemsToShow < filteredItems.length && (
        <div className="load-more-button flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuSection;