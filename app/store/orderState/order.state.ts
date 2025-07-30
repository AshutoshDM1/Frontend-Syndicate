import { create } from 'zustand';
import type { Order } from './order.types';

interface OrderStore {
  orders: Order[] | [];
  selectedOrder: Order | null;
  setOrders: (orders: Order[]) => void;
  setSelectedOrder: (order: Order | null) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  selectedOrder: null,
  setOrders: (orders: Order[]) => set({ orders }),
  setSelectedOrder: (order: Order | null) => set({ selectedOrder: order }),
}));
