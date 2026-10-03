import { configureStore } from '@reduxjs/toolkit';

import {
  cartReducer,
  cartRestored,
  getCartItems,
} from '@/entities/cart';
import { getOrders, ordersReducer, ordersRestored } from '@/entities/order';
import {
  getWardrobeItems,
  wardrobeLoadFailed,
  wardrobeReducer,
  wardrobeRestored,
} from '@/entities/wardrobe-item';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,
    wardrobe: wardrobeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

let previousState = store.getState();
let suppressPersistence = false;

store.subscribe(() => {
  const currentState = store.getState();
  if (suppressPersistence) {
    previousState = currentState;
    return;
  }

  if (currentState.cart !== previousState.cart) {
    localStorage.setItem('warehouse:cart', JSON.stringify(currentState.cart));
  }
  if (currentState.orders !== previousState.orders) {
    localStorage.setItem('warehouse:orders', JSON.stringify(currentState.orders));
  }
  if (currentState.wardrobe !== previousState.wardrobe) {
    localStorage.setItem('warehouse:wardrobe', JSON.stringify(currentState.wardrobe.items));
  }
  previousState = currentState;
});

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (
      event.key !== null &&
      event.key !== 'warehouse:cart' &&
      event.key !== 'warehouse:orders' &&
      event.key !== 'warehouse:wardrobe'
    ) {
      return;
    }

    suppressPersistence = true;
    try {
      if (event.key === null || event.key === 'warehouse:cart') {
        store.dispatch(cartRestored(getCartItems()));
      }
      if (event.key === null || event.key === 'warehouse:orders') {
        store.dispatch(ordersRestored(getOrders()));
      }
      if (event.key === null || event.key === 'warehouse:wardrobe') {
        store.dispatch(wardrobeRestored(getWardrobeItems()));
      }
    } catch (error) {
      console.error('Could not synchronize local data from another tab.', error);
      if (event.key === null || event.key === 'warehouse:wardrobe') {
        store.dispatch(wardrobeLoadFailed());
      }
    } finally {
      suppressPersistence = false;
      previousState = store.getState();
    }
  });
}
