import React from 'react'
import AdminNavBar from './AdminNavBar'
import OrderDashboard from './OrderDashboard/OrderDashboard'

const OrderManagement = () => {
  return (
    <div>
      <AdminNavBar/>
      <OrderDashboard/>
    </div>
  )
}

export default OrderManagement