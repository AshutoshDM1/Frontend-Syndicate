import type { APIResponse } from '~/types/api.types';
import api, { handleError } from './api';
import type { Category } from '~/store/menuItemState/category.types';

export interface CategoryApiResponse {
  pagination: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
  categories: Category[];
}

export const GetCategories = async () => {
  try {
    const response = await api.get(`/categories`);
    const data = response.data as APIResponse<CategoryApiResponse>;
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const DeleteCategory = async (id: string) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    const data = response.data as APIResponse<CategoryApiResponse>;
    return data;
  } catch (error) {
    handleError(error);
  }
};

interface CreateCategoryInput extends Omit<Category, 'id' | 'createdAt' | 'updatedAt'> {}

export const CreateCategory = async (category: CreateCategoryInput) => {
  try {
    const response = await api.post(`/categories`, category);
    const data = response.data as APIResponse<CategoryApiResponse>;
    return data;
  } catch (error) {
    handleError(error);
  }
};
