import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const TablePagination = ({
  filteredOrders,
  currentPage,
  ordersPerPage,
  paginate,
}) => {
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfFirstOrder = (currentPage - 1) * ordersPerPage;
  const indexOfLastOrder = currentPage * ordersPerPage;

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-3 sm:px-6 mt-4 rounded-lg shadow-sm">
      {/* Order Summary */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Total Orders:{" "}
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {filteredOrders.length}
            </span>
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Total Price:{" "}
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              ETB{" "}
              {filteredOrders
                .reduce((sum, order) => sum + (order.total_price || 0), 0)
                .toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
        <div className="text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Showing{" "}
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {indexOfFirstOrder + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {Math.min(indexOfLastOrder, filteredOrders.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {filteredOrders.length}
            </span>{" "}
            results
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md px-2 py-2 text-neutral-400 ring-1 ring-neutral-300 hover:bg-neutral-50 disabled:text-neutral-300 disabled:cursor-not-allowed dark:ring-neutral-600 dark:hover:bg-neutral-700/50 dark:text-neutral-400"
          >
            <span className="sr-only">Previous</span>
            <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              aria-current={currentPage === index + 1 ? "page" : undefined}
              className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:focus-visible:outline-neutral-300 ${
                currentPage === index + 1
                  ? "bg-primary-600 text-white"
                  : "text-neutral-700 ring-1 ring-neutral-300 hover:bg-neutral-50 dark:text-neutral-300 dark:ring-neutral-600 dark:hover:bg-neutral-700/50"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center rounded-md px-2 py-2 text-neutral-400 ring-1 ring-neutral-300 hover:bg-neutral-50 disabled:text-neutral-300 disabled:cursor-not-allowed dark:ring-neutral-600 dark:hover:bg-neutral-700/50 dark:text-neutral-400"
          >
            <span className="sr-only">Next</span>
            <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TablePagination;