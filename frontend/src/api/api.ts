import axios from "axios";
import type { Product, Order } from "../model/types";

const API_BASE = "http://localhost:8080/api";

export const getProducts = () => axios.get<Product[]>(`${API_BASE}/products`);
export const getOrders = () => axios.get<Order[]>(`${API_BASE}/orders`);
export const createOrder = (order: { userId: number; items: { productId: number; quantity: number }[] }) =>
  axios.post(`${API_BASE}/orders`, order);