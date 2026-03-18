import React, { useEffect, useState } from "react";
import { getOrders } from "../api/api";
import type { Order } from "../model/types";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders().then((res) => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      {orders.map((o) => (
        <div key={o.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <p>Order ID: {o.id}</p>
          <p>User: {o.user.name}</p>
          <p>Status: {o.status}</p>
          <p>Total: ${o.totalAmount}</p>
          <ul>
            {o.items.map((i, idx) => (
              <li key={idx}>
                {i.name} x {i.quantity} = ${i.subtotal}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Orders;