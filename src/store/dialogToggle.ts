import { create } from "zustand";

interface UseDialogToggle {
  toggleDialog: {
    isOpenEditEmployee: boolean;
    setIsOpenEditEmployee: (isOpenEditUser: boolean) => void;
    isOpenEditUser: boolean;
    setIsOpenEditUser: (isOpenEditUser: boolean) => void;
    isOpenAddUser: boolean;
    setIsOpenAddUser: (isOpenAddUser: boolean) => void;
    isOpenAddEmployee: boolean;
    setIsOpenAddEmployee: (isOpenAddUser: boolean) => void;
  };
}

export const useDialogToggle = create<UseDialogToggle>((set) => ({
  toggleDialog: {
    isOpenEditEmployee: false,
    setIsOpenEditEmployee: (isOpenEditEmployee: boolean) =>
      set((state) => ({
        toggleDialog: {
          ...state.toggleDialog,
          isOpenEditEmployee,
        },
      })),
    isOpenEditUser: false,
    setIsOpenEditUser: (isOpenEditUser: boolean) =>
      set((state) => ({
        toggleDialog: {
          ...state.toggleDialog,
          isOpenEditUser,
        },
      })),
    isOpenAddUser: false,
    setIsOpenAddUser: (isOpenAddUser: boolean) =>
      set((state) => ({
        toggleDialog: {
          ...state.toggleDialog,
          isOpenAddUser,
        },
      })),
    isOpenAddEmployee: false,
    setIsOpenAddEmployee: (isOpenAddEmployee: boolean) =>
      set((state) => ({
        toggleDialog: {
          ...state.toggleDialog,
          isOpenAddEmployee,
        },
      })),
  },
}));
