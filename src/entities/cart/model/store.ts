import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import type { CartItem } from './types';

const CART_STORAGE_KEY = 'warehouse:cart';

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
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every(isCartItem)) return parsed;

    console.error('Invalid cart data found in local storage.');
  } catch (error) {
    console.error('Could not read cart data from local storage.', error);
  }

  return [];
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartItems(),
  reducers: {
    cartItemAdded(state, action: PayloadAction<Pick<CartItem, 'productId' | 'size'>>) {
      const existing = state.find(
        (item) => item.productId === action.payload.productId && item.size === action.payload.size,
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    cartItemsAdded(state, action: PayloadAction<Array<Pick<CartItem, 'productId' | 'size'>>>) {
      for (const addedItem of action.payload) {
        const existing = state.find(
          (item) => item.productId === addedItem.productId && item.size === addedItem.size,
        );

        if (existing) {
          existing.quantity += 1;
        } else {
          state.push({ ...addedItem, quantity: 1 });
        }
      }
    },
    cartItemQuantityUpdated(
      state,
      action: PayloadAction<Pick<CartItem, 'productId' | 'size'> & { quantity: number }>,
    ) {
      return state
        .map((candidate) =>
          candidate.productId === action.payload.productId && candidate.size === action.payload.size
            ? { ...candidate, quantity: action.payload.quantity }
            : candidate,
        )
        .filter((candidate) => candidate.quantity > 0);
    },
    cartItemRemoved(state, action: PayloadAction<Pick<CartItem, 'productId' | 'size'>>) {
      return state.filter(
        (item) =>
          item.productId !== action.payload.productId || item.size !== action.payload.size,
      );
    },
    cartCleared() {
      return [];
    },
    cartRestored(_state, action: PayloadAction<CartItem[]>) {
      return action.payload;
    },
  },
});

export const {
  cartItemAdded,
  cartItemsAdded,
  cartItemQuantityUpdated,
  cartItemRemoved,
  cartCleared,
  cartRestored,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export function useCartItems() {
  return useSelector((state: { cart: CartItem[] }) => state.cart);
}
