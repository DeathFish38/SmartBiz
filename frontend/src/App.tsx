// src/App.tsx
import React, { useState } from "react";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";
import { Orders } from "./components/Orders";
import { Users } from "./components/Users";
import type { CartItem, Product, User } from "./types";
import { api } from "./api";

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const addToCart = (product: Product, quantity: number) => {
    const existing = cart.find(i => i.product.id === product.id);
    if (existing) {
      const updated = cart.map(i =>
        i.product.id === product.id
          ? { ...i, quantity: i.quantity + quantity, subtotal: (i.quantity + quantity) * product.price }
          : i
      );
      setCart(updated);
    } else {
      setCart([...cart, { product, quantity, subtotal: product.price * quantity }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(i => i.product.id !== productId));
  };

  const createOrder = async () => {
    if (!selectedUser) {
      alert("Please select a user first!");
      return;
    }
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }
    const request = {
      userId: selectedUser.id,
      items: cart.map(i => ({ productId: i.product.id, quantity: i.quantity })),
    };
    await api.post("/orders", request);
    setCart([]);
    alert("Order created!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Simple POS System</h1>
      <Users selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <Products addToCart={addToCart} />
      <Cart cart={cart} removeFromCart={removeFromCart} createOrder={createOrder} />
      <Orders />
    </div>
  );
};

export default App;