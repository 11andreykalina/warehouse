export type OrderStatus = 'submitted' | 'approved' | 'issued';

export type OrderItem = {
  productId: string;
  size: string;
  quantity: number;
};

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
};
