import React, { useState, useEffect } from 'react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from the API (replace with your API endpoint)
    fetch('/api/orders') // Replace this URL with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setOrders(data); // Set the fetched orders
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  }, []);

  const handleActionClick = (orderId, action) => {
    // Logic for action (e.g., changing the order status)
    console.log(`Action "${action}" for order ${orderId}`);
    // You can add the API call to update the order status here
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <h1 className="mb-3">Order List</h1>

      <div className="table-container">
        <div className="card p-3">
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Ship To</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Check if there are orders */}
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No Order
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.order_id}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        {order.order_number} by {order.first_name} {order.last_name}
                      </td>
                      <td>{order.order_date}</td>
                      <td>{order.shipping_address}</td>
                      <td>
                        <span
                          className={`status ${order.order_status.toLowerCase().replace(' ', '-')}`}
                        >
                          {order.order_status}
                        </span>
                      </td>
                      <td>${order.total_amount}</td>
                      <td>
                        <div className="dropdown">
                          <button
                            type="button"
                            className="btn dropdown-toggle hide-arrow d-flex align-items-center justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="bx bx-dots-vertical-rounded p-0"></i>
                          </button>
                          <div className="dropdown-menu">
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                              onClick={() => handleActionClick(order.order_id, 'Hold On')}
                            >
                              <i className="bx bx-edit-alt me-1"></i> Hold On
                            </a>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                              onClick={() => handleActionClick(order.order_id, 'Processing')}
                            >
                              <i className="bx bx-edit-alt me-1"></i> Processing
                            </a>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                              onClick={() => handleActionClick(order.order_id, 'Completed')}
                            >
                              <i className="bx bx-edit-alt me-1"></i> Completed
                            </a>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                              onClick={() => handleActionClick(order.order_id, 'Delete')}
                              style={{ color: 'red' }}
                            >
                              <i className="bx bx-trash me-1"></i> Delete
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <nav aria-label="Product Pagination">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
