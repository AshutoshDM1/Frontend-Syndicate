import type { APIResponse } from '~/types/api.types';
import api, { handleError } from './api';
import { OrderStatus, PaymentMethod } from '~/store/orderState/order.types';

export interface OrderItem {
  menuItemId?: string;
  comboMealId?: string;
  quantity: number;
}

export interface MakeOrderType {
  tableId: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  orderItems: OrderItem[];
}

export const MakeOrder = async (MakeOrderData: MakeOrderType) => {
  try {
    const response = await api.post(`/orders`, MakeOrderData);
    const data = response.data as APIResponse<any>;
    return data;
  } catch (error) {
    handleError(error);
  }
};
