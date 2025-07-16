import api, { handleError } from './api';

export const GetTables = async () => {
  try {
    const response = await api.get(`/tables?page=1&limit=20`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
