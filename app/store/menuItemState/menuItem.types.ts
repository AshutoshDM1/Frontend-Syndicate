export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    categoryId: string;
    isAvailable: boolean;
    rating: string;
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