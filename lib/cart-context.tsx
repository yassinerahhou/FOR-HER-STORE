'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, formatMad } from './products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ToastNotice {
  id: string;
  product: Product;
  message: string;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  searchOpen: boolean;
  quickViewProduct: Product | null;
  toast: ToastNotice | null;
  currency: 'MAD' | 'EUR' | 'USD';
  setCurrency: (c: 'MAD' | 'EUR' | 'USD') => void;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setQuickViewProduct: (p: Product | null) => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  dismissToast: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<ToastNotice | null>(null);
  const [currency, setCurrency] = useState<'MAD' | 'EUR' | 'USD'>('MAD');

  // Load cart & wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('gaouaher_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('gaouaher_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error('Error loading stored cart state:', e);
    }
  }, []);

  // Save cart & wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gaouaher_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart state:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('gaouaher_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist state:', e);
    }
  }, [wishlist]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    // Trigger Toast notification
    setToast({
      id: Date.now().toString(),
      product,
      message: `Added to your bag`,
    });

    // Auto open cart drawer after 500ms for smooth feedback
    setTimeout(() => {
      setCartOpen(true);
    }, 400);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const isSaved = prev.includes(productId);
      return isSaved ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  const dismissToast = () => {
    setToast(null);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        cartOpen,
        searchOpen,
        quickViewProduct,
        toast,
        currency,
        setCurrency,
        setCartOpen,
        setSearchOpen,
        setQuickViewProduct,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        dismissToast,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
