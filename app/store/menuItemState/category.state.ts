import { create } from 'zustand';
import type { Category } from './category.types';

interface CategoryStore {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (categories: Category[]) => set({ categories }),
}));