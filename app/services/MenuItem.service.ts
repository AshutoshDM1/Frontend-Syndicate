// eslint-disable-next-line @typescript-eslint/no-empty-object-type  
import type { MenuItem } from '~/store/menuItemState/menuItem.types';
import api, { handleError } from './api';
import type { APIResponse } from '~/types/api.types';

export interface MenuItemApiResponse {
  pagination: {
    limit: number,
    page: number,
    total: number,
    totalPages: number
  }
  menuItems: MenuItem[];
}

export const GetMenuItems = async () => {
  try {
    const response = await api.get(`/menu-items`);
    const data: APIResponse<MenuItemApiResponse> = response.data;
    return data;
  } catch (error) {
    handleError(error);
  }
};

export interface UpdateMenuItemInput extends Omit<MenuItem, 'createdAt' | 'updatedAt' | 'category' | 'modifiers'> {}

export const UpdateMenuItem = async (item: UpdateMenuItemInput) => {
  try {
    const response = await api.put(`/menu-items/${item.id}`, item);
    const data: APIResponse<MenuItemApiResponse> = response.data;
    return data;
  } catch (error) {
    handleError(error);
  }
};

export interface CreateMenuItemInput extends Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'> {}

export const CreateMenuItem = async (item: CreateMenuItemInput) => {
  try {
    const response = await api.post(`/menu-items`, item);
    const data: APIResponse<MenuItemApiResponse> = response.data;
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const DeleteMenuItem = async (id: string) => {
  try {
    const response = await api.delete(`/menu-items/${id}`);
    const data: APIResponse<MenuItemApiResponse> = response.data;
    return data;
  } catch (error) {
    handleError(error);
  }
};


