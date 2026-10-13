import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type CartLine = { productId: string; quantity: number };

type ShopContextValue = {
  cart: CartLine[];
  favorites: string[];
  totalItems: number;
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  toast: string | null;
  showToast: (message: string) => void;
  clearToast: () => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLocalStorage<CartLine[]>('platita-coquette-cart-v1', []);
  const [favorites, setFavorites] = useLocalStorage<string[]>('platita-coquette-favorites-v1', []);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function addToCart(productId: string, quantity = 1) {
    setCart((previous) => {
      const existing = previous.find((line) => line.productId === productId);
      if (!existing) return [...previous, { productId, quantity }];
      return previous.map((line) => line.productId === productId ? { ...line, quantity: line.quantity + quantity } : line);
    });
  }

  function updateQuantity(productId: string, quantity: number) {
    setCart((previous) => quantity <= 0 ? previous.filter((line) => line.productId !== productId) : previous.map((line) => line.productId === productId ? { ...line, quantity } : line));
  }

  function removeFromCart(productId: string) {
    setCart((previous) => previous.filter((line) => line.productId !== productId));
  }

  function toggleFavorite(productId: string) {
    setFavorites((previous) => previous.includes(productId) ? previous.filter((id) => id !== productId) : [...previous, productId]);
  }

  const value = useMemo<ShopContextValue>(() => ({
    cart, favorites, totalItems: cart.reduce((sum, line) => sum + line.quantity, 0),
    addToCart, updateQuantity, removeFromCart, toggleFavorite,
    cartOpen, setCartOpen, toast, showToast: setToast, clearToast: () => setToast(null),
  // Context changes whenever the underlying cart/favorites/UI changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [cart, favorites, cartOpen, toast]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop debe usarse dentro de ShopProvider');
  return context;
}
