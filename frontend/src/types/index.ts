export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  shopId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Shop {
  id: number;
  name: string;
  description: string;
  logoUrl: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: number;
  product: Product;
  quantity: number;
  shopId: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
} 