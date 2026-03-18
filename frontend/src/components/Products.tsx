import React, { useEffect, useState } from "react";
import type { Product } from "../types";
import { api } from "../api";

interface Props {
  addToCart: (product: Product, quantity: number) => void;
}

export const Products: React.FC<Props> = ({ addToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p.id} style={{ border: "1px solid gray", margin: 5, padding: 5 }}>
          <img src={p.imageUrl} alt={p.name} width={50} />
          <span style={{ marginLeft: 10 }}>{p.name} - ${p.price} (Stock: {p.stock})</span>
          <button style={{ marginLeft: 10 }} onClick={() => addToCart(p, 1)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};