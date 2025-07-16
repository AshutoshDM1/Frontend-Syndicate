import { create } from 'zustand';
import type { UserType } from './user.type';

interface UserState {
  users: UserType[] | [];
  user: UserType | null;
  setUsers: (users: UserType[]) => void;
  setUser: (user: UserType | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  user: null,
  setUsers: (users) => set({ users }),
  setUser: (user) => set({ user }),
}));
