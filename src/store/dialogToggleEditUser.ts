import { create } from "zustand";

interface UseDialogToggleEditUserProps {
  isOpenEditUser: boolean;
  setIsOpenEditUser: (isOpenEditUser: boolean) => void;
}

export const useDialogToggleEditUser = create<UseDialogToggleEditUserProps>(
  (set) => ({
    isOpenEditUser: false,
    setIsOpenEditUser: (isOpenEditUser) => set(() => ({ isOpenEditUser })),
  })
);
