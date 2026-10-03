import { useEffect, useState } from 'react';

import type { CartItem } from './types';

const CART_STORAGE_KEY = 'warehouse:cart';
const CART_CHANGE_EVENT = 'warehouse:cart-change';

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;
  return (
    typeof item.productId === 'string' &&
    typeof item.size === 'string' &&
    typeof item.quantity === 'number' &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
}

export function getCartItems(): CartItem[] {
  const raw = localStorage.getItem(CART_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);

    if (Array.isArray(parsed) && parsed.every(isCartItem)) {
      return parsed;
    }

    console.error('Invalid cart data found in local storage.');
    return [];
  } catch (error) {
    console.error('Could not read cart data from local storage.', error);
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
}

export function useCartItems() {
  const [items, setItems] = useState<CartItem[]>(getCartItems);

  useEffect(() => {
    const updateCart = () => setItems(getCartItems());
    const handleStorage = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY || event.key === null) {
        updateCart();
      }
    };

    window.addEventListener(CART_CHANGE_EVENT, updateCart);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(CART_CHANGE_EVENT, updateCart);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return items;
}

export function addToCart(productId: string, size: string) {
  const items = getCartItems();
  const existing = items.find((item) => item.productId === productId && item.size === size);

  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({ productId, size, quantity: 1 });
  }

  saveCart(items);
}

export function addItemsToCart(newItems: Array<Pick<CartItem, 'productId' | 'size'>>) {
  const items = getCartItems();

  for (const newItem of newItems) {
    const existing = items.find((item) => item.productId === newItem.productId && item.size === newItem.size);

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ ...newItem, quantity: 1 });
    }
  }

  saveCart(items);
}

export function updateCartItemQuantity(productId: string, size: string, quantity: number) {
  const updated = getCartItems()
    .map((item) =>
      item.productId === productId && item.size === size ? { ...item, quantity } : item,
    )
    .filter((item) => item.quantity > 0);

  saveCart(updated);
}

export function removeFromCart(productId: string, size: string) {
  saveCart(getCartItems().filter((item) => !(item.productId === productId && item.size === size)));
}

export function clearCart() {
  saveCart([]);
}
