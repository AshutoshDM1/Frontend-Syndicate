import api from "./api";

export const getTable = async () => {
    const response = await api.get('/tables');
    return response.data;
};
