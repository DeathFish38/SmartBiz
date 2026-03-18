// src/components/Cart.tsx
import React from "react";
import type { CartItem } from "../types";

interface Props {
  cart: CartItem[];
  removeFromCart: (productId: number) => void;
  createOrder: () => void;
}

export const Cart: React.FC<Props> = ({ cart, removeFromCart, createOrder }) => {
  const total = cart.reduce((acc, i) => acc + i.subtotal, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 && <p>Cart is empty</p>}
      {cart.map(i => (
        <div key={i.product.id}>
          {i.product.name} x {i.quantity} = ${i.subtotal.toFixed(2)}
          <button onClick={() => removeFromCart(i.product.id)}>Remove</button>
        </div>
      ))}
      {cart.length > 0 && (
        <>
          <p>Total: ${total.toFixed(2)}</p>
          <button onClick={createOrder}>Submit Order</button>
        </>
      )}
    </div>
  );
};