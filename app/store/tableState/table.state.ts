import { create } from 'zustand';
import type { Table } from './table.types';
import { TableStatus, TableSize } from './table.types';

interface TableStore {
  tables: Table[] | [];
  selectedTable: Table | null;
  setTables: (tables: Table[]) => void;
  setSelectedTable: (table: Table | null) => void;
}

const initialTables: Table[] = [
  // 1st Floor
  { id: '1', number: 'A1', status: TableStatus.AVAILABLE, size: TableSize.MEDIUM, floor: 1 },
  {
    id: '2',
    number: 'A2',
    status: TableStatus.OCCUPIED,
    size: TableSize.SMALL,
    floor: 1,
    orderStartTime: '14:30',
    orderId: 'ORD-001',
    customerCount: 2,
    totalAmount: 45.5,
    orderItems: 3,
  },
  {
    id: '3',
    number: 'A3',
    status: TableStatus.RESERVED,
    size: TableSize.LARGE,
    floor: 1,
    orderStartTime: '15:00',
    customerCount: 6,
  },
  { id: '4', number: 'A4', status: TableStatus.AVAILABLE, size: TableSize.MEDIUM, floor: 1 },
  { id: '5', number: 'A5', status: TableStatus.AVAILABLE, size: TableSize.MEDIUM, floor: 1 },
  {
    id: '6',
    number: 'A6',
    status: TableStatus.ORDERING,
    size: TableSize.MEDIUM,
    floor: 1,
    orderId: 'ORD-002',
    customerCount: 4,
    orderStartTime: '14:45',
  },
  {
    id: '7',
    number: 'A7',
    status: TableStatus.OCCUPIED,
    size: TableSize.SMALL,
    floor: 1,
    orderStartTime: '13:30',
    orderId: 'ORD-003',
    customerCount: 2,
    totalAmount: 32.0,
    orderItems: 5,
  },
  { id: '8', number: 'A8', status: TableStatus.NEEDS_CLEANING, size: TableSize.MEDIUM, floor: 1 },
  { id: '9', number: 'A9', status: TableStatus.AVAILABLE, size: TableSize.LARGE, floor: 1 },
  { id: '10', number: 'A10', status: TableStatus.AVAILABLE, size: TableSize.MEDIUM, floor: 1 },
  {
    id: '11',
    number: 'A11',
    status: TableStatus.ORDERING,
    size: TableSize.MEDIUM,
    floor: 1,
    orderId: 'ORD-004',
    customerCount: 3,
    orderStartTime: '15:15',
  },
  { id: '12', number: 'A12', status: TableStatus.AVAILABLE, size: TableSize.MEDIUM, floor: 1 },
  {
    id: '13',
    number: 'A13',
    status: TableStatus.OCCUPIED,
    size: TableSize.LARGE,
    floor: 1,
    orderId: 'ORD-005',
    customerCount: 8,
    orderStartTime: '12:30',
    totalAmount: 125.75,
    orderItems: 12,
  },
  { id: '14', number: 'A14', status: TableStatus.AVAILABLE, size: TableSize.LARGE, floor: 1 },
  // 2nd Floor
  { id: '15', number: 'B1', status: TableStatus.AVAILABLE, size: TableSize.MEDIUM, floor: 2 },
  {
    id: '16',
    number: 'B2',
    status: TableStatus.RESERVED,
    size: TableSize.SMALL,
    floor: 2,
    orderStartTime: '16:00',
    customerCount: 2,
  },
  { id: '17', number: 'B3', status: TableStatus.AVAILABLE, size: TableSize.LARGE, floor: 2 },
  {
    id: '18',
    number: 'B4',
    status: TableStatus.ORDERING,
    size: TableSize.MEDIUM,
    floor: 2,
    orderId: 'ORD-006',
    customerCount: 4,
    orderStartTime: '15:30',
  },
  // 3rd Floor
  { id: '19', number: 'C1', status: TableStatus.AVAILABLE, size: TableSize.MEDIUM, floor: 3 },
  { id: '20', number: 'C2', status: TableStatus.NEEDS_CLEANING, size: TableSize.SMALL, floor: 3 },
];

export const useTableStore = create<TableStore>((set) => ({
  tables: [],
  selectedTable: null,
  setTables: (tables: Table[]) => set({ tables }),
  setSelectedTable: (table: Table | null) => set({ selectedTable: table }),
}));
