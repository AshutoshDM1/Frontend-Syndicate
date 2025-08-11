import { create } from 'zustand';
import type { ComboMeal } from './comboMeal.types';

interface ComboMealStore {
  comboMeals: ComboMeal[];
  setComboMeals: (comboMeals: ComboMeal[]) => void;
}

export const useComboMealStore = create<ComboMealStore>((set) => ({
  comboMeals: [],
  setComboMeals: (comboMeals: ComboMeal[]) => set({ comboMeals }),
}));
