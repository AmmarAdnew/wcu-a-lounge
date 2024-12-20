import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Your Firebase config file

const OrderDashboard = () => {
  const [orders, setOrders] = useState([]);

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const ordersCollectionRef = collection(db, "orders");

  // Fetch orders from Firestore
  const getOrders = () => {
    try {
      // Set up a real-time listener for orders
      const unsubscribe = onSnapshot(
        ordersCollectionRef,
        (snapshot) => {
          const fetchedOrders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(fetchedOrders);
          console.log(fetchedOrders); // Update the state with real-time data
        },
        (error) => {
          console.error("Error fetching orders:", error);
        }
      );

      // Optionally return the unsubscribe function to stop listening
      return unsubscribe;
    } catch (error) {
      console.error("Error setting up real-time listener for orders:", error);
    }
  };

  useEffect(() => {
    const unsubscribeOrders = getOrders();

    return () => {
      if (unsubscribeOrders) {
        unsubscribeOrders(); // Clean up listener when component unmounts
      }
    };
  }, []); // Empty dependency array ensures this runs once when the component mounts

  useEffect(() => {
    let filtered = [...orders];

    // Filter by status
    if (filterStatus !== "All") {
      filtered = filtered.filter((order) => order.status === filterStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [orders, searchTerm, filterStatus]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderDoc = doc(db, "orders", orderId);
      await updateDoc(orderDoc, { status: newStatus });
      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error(`Error updating order ${orderId} status:`, error);
    }
  };

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg rounded-lg mt-3 mx-2">
        <h1 className="text-3xl font-bold tracking-wide">Order Management</h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Order ID or Customer Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-
gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        {/* Filter Dropdown */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-
gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="All">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="Ready">Ready</option>
          <option value="complete">Complete</option>
        </select>
      </div>

      <div className="m-3">
        <div className="relative overflow-x-auto shadow-md sm:rounded-t-lg">
          {/* Display Orders */}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col
"
                  className="px-6 py-3"
                >
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Items Ordered
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3">
                  Takeaway
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order.orderId}
                  </td>
                  <td className="px-6 py-4">{order.customerName}</td>
                  <td className="px-6 py-4">
                    {/* Handling itemsOrdered as an object */}
                    {order.itemsOrdered && order.itemsOrdered.length > 0 ? (
                      <ol className="list-decimal list-inside text-gray-800 dark:text-gray-200">
                        {order.itemsOrdered.map((item, index) => (
                          <li key={index} className="py-1 text-sm font-medium">
                            <span className="font-medium">{item.itemName}</span>{" "}
                            X{" "}
                            <span className="font-semibold">
                              {item.quantity}
                            </span>{" "}
                            (ETB{" "}
                            <span className="font-medium">
                              {item.price && !isNaN(item.price)
                                ? item.price.toFixed(2)
                                : "N/A"}
                            </span>
                            )
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">
                        No items ordered
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    ETB
                    {order.total_price && !isNaN(order.total_price)
                      ? order.total_price.toFixed(2)
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {order.timestamp
                      ? new Date(
                          order.timestamp.seconds * 1000
                        ).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {order.takeaway ? "true" : "false"}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="Ready">Ready</option>
                      <option value="complete">Complete</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav
          className="flex items-center justify-between border-t rounded-b-lg border-gray-200 bg-white px-4 py-3 sm:px-6 dark:border-gray-700 dark:bg-gray-700"
          aria-label="Table navigation"
        >
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:ring-gray
-600"
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:ring-gray-600"
            >
              Next
            </button>
          </div>

          {/* Center Section (Total Orders and Total Price) */}
          <div className="hidden sm:flex sm:items-center sm:justify-center flex-col sm:flex-row gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Total Orders :{" "}
                <span className="font-medium">{filteredOrders.length}</span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Total Price:{" "}
                <span className="font-medium">
                  ETB{" "}
                  {filteredOrders
                    .reduce((sum, order) => sum + (order.total_price || 0), 0)
                    .toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          {/* Right Section (Pagination) */}
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
            <div className="flex items-center">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Showing{" "}
                  <span className="font-medium">{indexOfFirstOrder + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastOrder, filteredOrders.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredOrders.length}</span>{" "}
                  results
                </p>
              </div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm ml-4"
                aria-label="Pagination"
              >
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:ring-gray-600"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    aria-current={
                      currentPage === index + 1 ? "page" : undefined
                    }
                    className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-gray-300 ${
                      currentPage === index + 1
                        ? "bg-indigo-600 text-white"
                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:ring-gray-600"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:ring-gray-600"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default OrderDashboard;
