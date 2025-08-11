// Types for table management in POS
export enum OrderStatus {
  STARTED = 'STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  UPI = 'UPI',
  WALLET = 'WALLET',
  NET_BANKING = 'NET_BANKING',
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuItemId: string;
  comboMealId: string;
  quantity: number;
}

export interface Order {
  id: string;
  tableId: string;
  customerName: string;
  customerPhone: string;
  orderTime: string;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  customerId: string;
  orderItems: OrderItem[];
}
