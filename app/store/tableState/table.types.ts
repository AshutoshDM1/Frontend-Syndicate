// Types for table management in POS
export type TableStatus = 'available' | 'occupied' | 'reserved' | 'ordering' | 'needs-cleaning';
export type TableSize = 'small' | 'medium' | 'large';

export interface Table {
  id: string | null ;
  number: string;
  status: TableStatus;
  size: TableSize;
  orderStartTime?: string;
  orderId?: string;
  customerCount?: number;
  floor: number;
  totalAmount?: number;
  orderItems?: number;
}