import React from "react";
import type { CartItem } from "../model/types";

interface Props {
  cart: CartItem[];
  updateQuantity: (index: number, quantity: number) => void;
  removeItem: (index: number) => void;
  submitOrder: (userId: number) => void;
  userId: number;
}

const Cart: React.FC<Props> = ({ cart, updateQuantity, removeItem, submitOrder, userId }) => {
  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 && <p>Cart is empty</p>}
      {cart.map((item, index) => (
        <div key={index}>
          <p>
            {item.name} - ${item.price} x{" "}
            <input
              type="number"
              value={item.quantity}
              min={1}
              max={item.stock}
              onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
            />{" "}
            = ${item.price * item.quantity}
          </p>
          <button onClick={() => removeItem(index)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      {cart.length > 0 && <button onClick={() => submitOrder(userId)}>Submit Order</button>}
    </div>
  );
};

export default Cart;