import React, { useEffect, useState } from "react";
import type { Product } from "../model/types";
import { getProducts } from "../api/api";

interface Props {
  addToCart: (product: Product) => void;
}

const ProductList: React.FC<Props> = ({ addToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
            <img src={p.imageUrl} alt={p.name} width={100} />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <p>Stock: {p.stock}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;