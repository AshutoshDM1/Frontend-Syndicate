import { create } from 'zustand';
import type { Table } from './table.types';

interface TableStore {
  tables: Table[] | [];
  selectedTable: Table | null;
  setTables: (tables: Table[]) => void;
  setSelectedTable: (table: Table | null) => void;
}

export const useTableStore = create<TableStore>((set) => ({
  tables: [],
  selectedTable: null,
  setTables: (tables: Table[]) => set({ tables }),
  setSelectedTable: (table: Table | null) => set({ selectedTable: table }),
}));
