import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface CartItem {
  productId: number;
  name: string;
  quantity: number;
  subtotal: number;
}

interface OrderResponse {
  id: number;
  status: string;
  totalAmount: number;
  items: CartItem[];
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [order, setOrder] = useState<OrderResponse | null>(null);

  // Fetch products
  useEffect(() => {
    axios.get<Product[]>("http://localhost:8080/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === product.id);
      if (existing) {
        return prev.map(i =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity + 1, subtotal: (i.quantity + 1) * product.price }
            : i
        );
      }
      return [...prev, { productId: product.id, name: product.name, quantity: 1, subtotal: product.price }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(i => i.productId !== productId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    if (cart.length === 0) return alert("Cart is empty!");

    try {
      const payload = {
        userId: 1, // Replace with logged-in user id
        items: cart.map(i => ({ productId: i.productId, quantity: i.quantity }))
      };

      const res = await axios.post<OrderResponse>("http://localhost:8080/api/orders", payload);
      setOrder(res.data);
      setCart([]); // clear cart
      alert("Order submitted successfully!");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.error || "Error submitting order");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - ${p.price.toFixed(2)} (Stock: {p.stock})
            <button onClick={() => addToCart(p)} style={{ marginLeft: 10 }}>Add to Cart</button>
          </li>
        ))}
      </ul>

      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.productId}>
              {item.name} x {item.quantity} = ${item.subtotal.toFixed(2)}
              <button onClick={() => removeFromCart(item.productId)} style={{ marginLeft: 10 }}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={cart.length === 0}>
          Submit Order
        </button>
      </form>

      {order && (
        <div style={{ marginTop: "20px" }}>
          <h2>Last Order</h2>
          <p>Order ID: {order.id}</p>
          <p>Status: {order.status}</p>
          <p>Total: ${order.totalAmount.toFixed(2)}</p>
          <ul>
            {order.items.map(i => (
              <li key={i.productId}>
                {i.name} x {i.quantity} = ${i.subtotal.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;