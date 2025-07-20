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

export const GetTables = async () => {
  try {
    const response = await api.get(`/tables?page=1&limit=20`);
    const data: APIResponse<TableApiResponse> = response.data;
    return data;
  } catch (error) {
    handleError(error);
  }
};
