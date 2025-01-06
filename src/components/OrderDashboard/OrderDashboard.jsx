import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import TablePagination from "./TablePagination";
import OrderTable from "./OrderTable";

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
      const unsubscribe = onSnapshot(
        ordersCollectionRef,
        (snapshot) => {
          const fetchedOrders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(fetchedOrders);
        },
        (error) => {
          console.error("Error fetching orders:", error);
        }
      );
      return unsubscribe;
    } catch (error) {
      console.error("Error setting up real-time listener:", error);
    }
  };

  useEffect(() => {
    const unsubscribeOrders = getOrders();
    return () => {
      if (unsubscribeOrders) {
        unsubscribeOrders();
      }
    };
  }, []);

  useEffect(() => {
    let filtered = [...orders];
    if (filterStatus !== "All") {
      filtered = filtered.filter((order) => order.status === filterStatus);
    }
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
    } catch (error) {
      console.error(`Error updating order status:`, error);
    }
  };

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="bg-primary text-white shadow-lg rounded-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide text-shadow">
          Order Management
        </h1>

        {/* Search & Filter */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FontAwesomeIcon
                icon={faSearch}
                className="h-5 w-5 text-primary-dark"
              />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-black placeholder-primary-dark text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-primary-light focus:border-primary-light"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FontAwesomeIcon
                icon={faFilter}
                className="h-5 w-5 text-primary-dark"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white text-primary-dark text-sm rounded-lg block w-full pl-8 pr-4 p-2.5 focus:ring-primary-light focus:border-primary-light"
            >
              <option value="All">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="Ready">Ready</option>
              <option value="complete">Complete</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <OrderTable
        currentOrders={currentOrders}
        handleStatusChange={handleStatusChange}
      />

      {/* Pagination */}
      <TablePagination
        filteredOrders={filteredOrders}
        currentPage={currentPage}
        ordersPerPage={ordersPerPage}
        paginate={paginate}
      />
    </div>
  );
};

export default OrderDashboard;