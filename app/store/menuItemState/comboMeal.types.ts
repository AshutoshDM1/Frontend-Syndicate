export interface ComboMeal {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    isAvailable: boolean;
    createdAt?: string;
    updatedAt?: string;
}