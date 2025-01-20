import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGifts,
  faBoxOpen,
  faCheckCircle,
  faClock,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const OrderTable = ({ currentOrders, handleStatusChange }) => {
  // Utility function to format currency
  const formatCurrency = (amount) => {
    return `ETB ${amount?.toFixed(2) || "N/A"}`;
  };

  // Utility function to format timestamp
  const formatTimestamp = (timestamp) => {
    return timestamp
      ? new Date(timestamp.seconds * 1000).toLocaleString()
      : "N/A";
  };

  // Function to get status details (color and icon)
  const getStatusDetails = (status) => {
    switch (status) {
      case "pending":
        return {
          colorClass:
            "bg-accent-warning text-accent-warning dark:bg-accent-warning/10 dark:text-accent-warning",
          icon: faClock,
        };
      case "Ready":
        return {
          colorClass:
            "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
          icon: faBoxOpen,
        };
      case "complete":
        return {
          colorClass:
            "bg-accent-success/20 text-accent-success dark:bg-accent-success/10 dark:text-accent-success",
          icon: faCheckCircle,
        };
      default:
        return {
          colorClass:
            "bg-neutral text-neutral-800 dark:bg-neutral-900/20 dark:text-neutral",
          icon: faBoxOpen,
        };
    }
  };

  // Sort orders by timestamp in descending order (most recent first)
  const sortedOrders = [...currentOrders].sort((a, b) => {
    const timestampA = a.timestamp?.seconds || 0;
    const timestampB = b.timestamp?.seconds || 0;
    return timestampB - timestampA; // Descending order
  });

  return (
    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg border border-neutral-200 dark:border-neutral-700">
      <table className="w-full text-sm text-left text-neutral-800 dark:text-neutral-200 divide-y divide-neutral-200 dark:divide-neutral-700">
        <thead className="text-xs text-neutral-100 uppercase bg-primary dark:bg-primary-dark">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order ID
            </th>
            <th scope="col" className="px-6 py-3">
              Customer Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone Number
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
              <div className="flex items-center">
                <FontAwesomeIcon icon={faGifts} className="pr-1" />
                Takeaway
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faBoxOpen} className="h-4 w-4 mr-1" />
                Status
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction Reference
            </th>
            
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
          {sortedOrders.length > 0 ? (
            sortedOrders.map((order) => {
              const { colorClass, icon } = getStatusDetails(order.status);

              return (
                <tr
                  key={order.id}
                  className="bg-white hover:bg-neutral-50/50 dark:bg-neutral-800 dark:hover:bg-neutral-700/100 transition-all duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 font-medium text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
                    {order.orderId}
                  </td>
                  <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                    {order.email}
                  </td>
                  <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                    {order.phoneNumber}
                  </td>
                  <td className="px-4 py-4 min-w-[300px]">
                    {order.itemsOrdered && order.itemsOrdered.length > 0 ? (
                      <ol className="list-decimal list-inside text-neutral-900 dark:text-neutral-100">
                        {order.itemsOrdered.map((item, index) => (
                          <li key={index} className="py-1 text-sm font-medium">
                            <span className="font-medium text-neutral-900 dark:text-neutral-100">
                              {item.itemName}
                            </span>{" "}
                            X{" "}
                            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                              {item.quantity}
                            </span>{" "}
                            (ETB{" "}
                            <span className="font-medium text-neutral-900 dark:text-neutral-100">
                              {item.price && !isNaN(item.price)
                                ? item.price.toFixed(2)
                                : "N/A"}
                            </span>
                            )
                          </li>
                          
                        ))}
                      </ol>
                    ) : (
                      <p className="text-neutral-500 dark:text-neutral-400">
                        No items ordered
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                    {formatCurrency(order.total_price)}
                  </td>
                  <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                    {formatTimestamp(order.timestamp)}
                  </td>
                  <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                    {order.takeaway ? (
                      <>
                        <FontAwesomeIcon icon={faGifts} className="pr-1" /> Yes
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="pr-1"
                        />{" "}
                        No
                      </>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={icon}
                        className={`h-4 w-4 ${colorClass}`}
                      />
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="mt-2 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-100 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      aria-label="Change order status"
                    >
                      <option value="pending">Pending</option>
                      <option value="Ready">Ready</option>
                      <option value="complete">Complete</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                    {order.transactionReference}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={11} className="px-6 py-4 text-center text-neutral-500 dark:text-neutral-400">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;