import type { APIResponse } from '~/types/api.types';
import api, { handleError } from './api';
import type { ComboMeal } from '~/store/menuItemState/comboMeal.types';

export interface ComboMealApiResponse {
  pagination: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
  comboMeals: ComboMeal[];
}

export const GetComboMeals = async () => {
  try {
    const response = await api.get(`/combo-meals`);
    const data = response.data as APIResponse<ComboMealApiResponse>;
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const CreateComboMeal = async (comboMeal: ComboMeal) => {
  try {
    const response = await api.post(`/combo-meals`, comboMeal);
    const data = response.data as APIResponse<ComboMealApiResponse>;
    return data;
  } catch (error) {
    handleError(error);
  }
};
