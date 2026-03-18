export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: {
    id: number;
    name: string;
  };
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  stock: number;
  quantity: number;
}

export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  status: string;
  totalAmount: number;
  user: {
    id: number;
    name: string;
  };
  items: OrderItem[];
}