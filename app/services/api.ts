import axios from "axios";
import { toast } from "sonner";

const handleError = (error: any) => {
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

export const GetUserDetailTable = async (role: string) => {
    try {
        const response = await api.get(`/users/user-detail-table?role=${role}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const UpdateUser = async (users: any) => {
    try {
        const response = await api.put(`/users/update-user`, users);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export default api; 
