// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string | number;
  image: string;
  categoryId: string;
  isAvailable: boolean;
  rating: string | number;
  prepTime: number;
  calories: number;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
  };
  modifiers: any[];
}
