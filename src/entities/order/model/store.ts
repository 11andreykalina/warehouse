import { useEffect, useState } from 'react';

import type { Order, OrderItem } from './types';

const ORDERS_STORAGE_KEY = 'warehouse:orders';
const ORDERS_CHANGE_EVENT = 'warehouse:orders-change';

function isOrderItem(value: unknown): value is OrderItem {
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

function isOrder(value: unknown): value is Order {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

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
  const raw = localStorage.getItem(ORDERS_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);

    if (Array.isArray(parsed) && parsed.every(isOrder)) {
      return parsed;
    }

    console.error('Invalid order data found in local storage.');
    return [];
  } catch (error) {
    console.error('Could not read order data from local storage.', error);
    return [];
  }
}

function saveOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  window.dispatchEvent(new Event(ORDERS_CHANGE_EVENT));
}

export function createOrder(items: OrderItem[]): Order {
  if (items.length === 0 || !items.every(isOrderItem)) {
    throw new Error('Cannot submit an empty or invalid issue request.');
  }

  const order: Order = {
    id: `request-${crypto.randomUUID()}`,
    createdAt: new Date().toISOString(),
    status: 'submitted',
    items: items.map((item) => ({ ...item })),
  };

  saveOrders([order, ...getOrders()]);
  return order;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(getOrders);

  useEffect(() => {
    const updateOrders = () => setOrders(getOrders());
    const handleStorage = (event: StorageEvent) => {
      if (event.key === ORDERS_STORAGE_KEY || event.key === null) {
        updateOrders();
      }
    };

    window.addEventListener(ORDERS_CHANGE_EVENT, updateOrders);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(ORDERS_CHANGE_EVENT, updateOrders);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return orders;
}
