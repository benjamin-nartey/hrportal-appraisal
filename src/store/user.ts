import { create } from "zustand";

interface UserStore {
  user: UserDataProps | null;
  updateUser: (user: UserDataProps) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  updateUser: (user) => set({ user }),
}));
