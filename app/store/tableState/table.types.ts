// Types for table management in POS
export enum TableStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED',
  ORDERING = 'ORDERING',
  NEEDS_CLEANING = 'NEEDS_CLEANING',
}
export enum TableSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export interface Table {
  id: string | null;
  number: string;
  status: TableStatus;
  size: TableSize;
  orderId?: string;
  floor: number;
}
