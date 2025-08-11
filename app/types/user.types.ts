export enum Role {
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
  role: Role;
  image: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
