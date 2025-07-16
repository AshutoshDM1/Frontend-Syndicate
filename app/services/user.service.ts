import type { UserRole } from '~/store/userStete/user.type';
import api, { handleError } from './api';

export const GetUserDetailTable = async (role: string = 'ALL') => {
  try {
    const response = await api.get(`/users/user-detail-table?role=${role}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

interface UpdateUserProps {
  id: string;
  role: UserRole;
}

export const UpdateUser = async ({ id, role }: UpdateUserProps) => {
  try {
    const response = await api.put(`/users/update-user`, { id, role });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
