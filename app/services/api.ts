/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { toast } from 'sonner';

export const handleError = (error: any) => {
  if (error.response) {
    toast.error(error.response.data.message);
  } else if (error.request) {
    toast.error('No response received');
  } else {
    toast.error('Error setting up request');
  }
  return Promise.reject(error);
};

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:2020';

const api = axios.create({
  baseURL: `${URL}/api/v1`,
  withCredentials: true,
});

export default api;
