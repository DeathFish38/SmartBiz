// frontend model 

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface ProductCategory {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: ProductCategory;
}

export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
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
  items: OrderItem[];
}