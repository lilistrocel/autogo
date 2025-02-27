import axios from 'axios';
import { Shop, Product } from '../types';

// Create axios instance with environment-aware configuration
const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false
});

// Add error handling interceptor
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Shop API
export const getShops = () => api.get<Shop[]>('/shops/').then(res => res.data);

export const createShop = (shop: Partial<Shop>) =>
  api.post<Shop>('/shops/', shop).then(res => res.data);

export const updateShop = (shopId: number, shop: Partial<Shop>) =>
  api.put<Shop>(`/shops/${shopId}/`, shop).then(res => res.data);

export const deleteShop = (shopId: number) =>
  api.delete(`/shops/${shopId}/`).then(res => res.data);

// Product API
export const getProducts = (shopId?: number) =>
  api.get<Product[]>('/products/', { 
    params: { 
      shop_id: shopId 
    } 
  }).then(res => res.data);

export const createProduct = (product: Partial<Product>) =>
  api.post<Product>('/products/', product).then(res => res.data);

export const updateProduct = (productId: number, product: Partial<Product>) =>
  api.put<Product>(`/products/${productId}/`, product).then(res => res.data);

export const deleteProduct = (productId: number) =>
  api.delete(`/products/${productId}/`).then(res => res.data);

// File upload
export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data.url;
}; 