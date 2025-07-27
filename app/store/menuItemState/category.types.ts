export interface Category {
  id: string ;
  name: string ;
  description: string ;
  isActive: boolean ;
  sortOrder?: number ;
  createdAt?: string ;
  updatedAt?: string ;
}