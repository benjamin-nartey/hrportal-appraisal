import { create } from "zustand";

interface UseDialogToggleAddUserProps {
  isOpenAddUser: boolean;
  setIsOpenAddUser: (isOpenAddUser: boolean) => void;
}

export const useDialogToggleAddUser = create<UseDialogToggleAddUserProps>(
  (set) => ({
    isOpenAddUser: false,
    setIsOpenAddUser: (isOpenAddUser) => set(() => ({ isOpenAddUser })),
  })
);
