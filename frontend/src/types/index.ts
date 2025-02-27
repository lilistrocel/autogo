export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  shopId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  shopId: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
} 