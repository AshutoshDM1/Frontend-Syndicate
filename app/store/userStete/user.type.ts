export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  ORDER_MANAGER = 'ORDER_MANAGER',
  KITCHEN_MANAGER = 'KITCHEN_MANAGER',
  CUSTOMER = 'CUSTOMER',
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  password: string | null;
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  image: string;
}