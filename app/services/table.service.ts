import type { Table } from '~/store/tableState/table.types';
import api, { handleError } from './api';
import type { APIResponse } from '~/types/api.types';

export interface TableApiResponse {
  pagination: {
    limit: number,
    page: number,
    total: number,
    totalPages: number
  }
  tables: Table[];
}

export interface UpdateTableResponse {
  statusCode: number;
  data: Table;
  message: string;
  success: boolean;
}
export const GetTables = async () => {
  try {
    const response = await api.get(`/tables?page=1&limit=100`);
    const data: APIResponse<TableApiResponse> = response.data;
    return data;
  } catch (error) {
    handleError(error);
  }
};

export interface UpdateTableInput extends Omit<Table, 'createdAt' | 'updatedAt' | 'orderId'> {}

export const UpdateTable = async (table: UpdateTableInput) => {
  try {
    const response = await api.put(`/tables`, table);
    const data: APIResponse<UpdateTableResponse> = response.data;
    return data;
  } catch (error) {
    handleError(error);
  }
};

export interface CreateTableInput extends Omit<Table, 'id' | 'createdAt' | 'updatedAt' | 'orderId'> {}

export const CreateTable = async (table: CreateTableInput) => {
  try {
    const response = await api.post(`/tables`, table);
    const data: APIResponse<UpdateTableResponse> = response.data;
    return data;
  } catch (error) {
    handleError(error);
  }
};


export const DeleteTable = async (id: string) => {
  try {
    const response = await api.delete(`/tables/${id}`);
    const data: APIResponse<UpdateTableResponse> = response.data;
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};
