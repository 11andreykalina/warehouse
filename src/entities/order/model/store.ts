import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import type { Order, OrderItem } from './types';

const ORDERS_STORAGE_KEY = 'warehouse:orders';

function isOrderItem(value: unknown): value is OrderItem {
  if (typeof value !== 'object' || value === null) return false;

  const item = value as Record<string, unknown>;
  return (
    typeof item.productId === 'string' &&
    typeof item.size === 'string' &&
    typeof item.quantity === 'number' &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
}

function isOrder(value: unknown): value is Order {
  if (typeof value !== 'object' || value === null) return false;

  const order = value as Record<string, unknown>;
  return (
    typeof order.id === 'string' &&
    typeof order.createdAt === 'string' &&
    (order.status === 'submitted' || order.status === 'approved' || order.status === 'issued') &&
    Array.isArray(order.items) &&
    order.items.length > 0 &&
    order.items.every(isOrderItem)
  );
}

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every(isOrder)) return parsed;

    console.error('Invalid order data found in local storage.');
  } catch (error) {
    console.error('Could not read order data from local storage.', error);
  }

  return [];
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState: getOrders(),
  reducers: {
    orderAdded(state, action: PayloadAction<Order>) {
      state.unshift(action.payload);
    },
    orderMarkedIssued(state, action: PayloadAction<string>) {
      const order = state.find((candidate) => candidate.id === action.payload);
      if (order && order.status !== 'issued') order.status = 'issued';
    },
    ordersRestored(_state, action: PayloadAction<Order[]>) {
      return action.payload;
    },
  },
});

export const { orderAdded, orderMarkedIssued, ordersRestored } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;

export function createOrder(items: OrderItem[]): Order {
  if (items.length === 0 || !items.every(isOrderItem)) {
    throw new Error('Cannot submit an empty or invalid issue request.');
  }

  return {
    id: `request-${crypto.randomUUID()}`,
    createdAt: new Date().toISOString(),
    status: 'submitted',
    items: items.map((item) => ({ ...item })),
  };
}

export function useOrders() {
  return useSelector((state: { orders: Order[] }) => state.orders);
}
