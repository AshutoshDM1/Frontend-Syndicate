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
