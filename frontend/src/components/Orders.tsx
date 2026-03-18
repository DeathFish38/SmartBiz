import React, { useEffect, useState } from "react";
import type { Order } from "../types";
import { api } from "../api";

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get("/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      {orders.map(o => (
        <div key={o.id} style={{ border: "1px solid gray", margin: 5, padding: 5 }}>
          <p>Order #{o.id} - {o.status} - Total: ${o.totalAmount.toFixed(2)}</p>
          {o.items.map(i => (
            <p key={i.productId}>{i.name} x {i.quantity} = ${i.subtotal.toFixed(2)}</p>
          ))}
        </div>
      ))}
    </div>
  );
};