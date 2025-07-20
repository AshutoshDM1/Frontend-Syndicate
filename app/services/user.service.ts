import type { UserRole, UserType } from '~/store/userStete/user.type';
import api, { handleError } from './api';
import type { APIResponse } from '~/types/api.types';

export interface UserApiResponse {
  users: UserType[];
  role : UserRole | 'ALL';
}

export const GetUserDetailTable = async (role: string = 'ALL') => {
  try {
    const response = await api.get(`/users/user-detail-table?role=${role}`);
    const data: APIResponse<UserApiResponse> = response.data;
    return data;
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
    const data: APIResponse<UserType> = response.data;
    return data;
  } catch (error) {
    handleError(error);
  }
};
