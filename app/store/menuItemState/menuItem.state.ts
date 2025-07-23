import { create } from 'zustand';
import type { MenuItem } from './menuItem.types';

interface MenuItemStore {
  menuItems: MenuItem[];
  setMenuItems: (menuItems: MenuItem[]) => void;
}

export const useMenuItemStore = create<MenuItemStore>((set) => ({
  menuItems: [],
  setMenuItems: (menuItems: MenuItem[]) => set({ menuItems }),
}));