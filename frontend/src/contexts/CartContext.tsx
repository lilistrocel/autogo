import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  total: number;
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, change: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; change: number } }
  | { type: 'CLEAR_CART' };

interface CartState {
  items: CartItem[];
  total: number;
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        item => item.productId === action.payload.id
      );

      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.productId === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }

      const newItem: CartItem = {
        id: Math.random().toString(36).substr(2, 9),
        productId: action.payload.id,
        product: action.payload,
        quantity: 1,
        shopId: action.payload.shopId,
      };

      return {
        items: [...state.items, newItem],
        total: calculateTotal([...state.items, newItem]),
      };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.itemId
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + action.payload.change),
            }
          : item
      );
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
      };

    default:
      return state;
  }
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

const CART_STORAGE_KEY = 'shopping_cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      const { items } = JSON.parse(savedCart);
      items.forEach((item: CartItem) => {
        dispatch({ type: 'ADD_ITEM', payload: item.product });
      });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateQuantity = (itemId: string, change: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, change } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total: state.total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 