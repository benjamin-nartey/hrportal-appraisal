"use client";

import React from "react";
import { DataTable } from "@/components/data-table";
import { DrawerDialog } from "@/components/drawable-dialog";
import { UserForm } from "./user-form";
import useColumns from "./columns";
import { useDialogToggleAddUser } from "@/store/dialogToggleAddUser";
import { useDialogToggleEditUser } from "@/store/dialogToggleEditUser";
import { EditUserForm } from "./edit-user-form";

interface UsersPageProps {
  users: UserDataProps[];
  tokenData: AccessTokenProps;
}

export default function UsersPage({ users, tokenData }: UsersPageProps) {
  const columns = useColumns();
  const { isOpenAddUser, setIsOpenAddUser } = useDialogToggleAddUser();
  const { isOpenEditUser, setIsOpenEditUser } = useDialogToggleEditUser();

  return (
    <>
      <DataTable
        columns={columns}
        data={users}
        isOpenAddUser={isOpenAddUser}
        isOpenEditUser={isOpenEditUser}
        drawalDialogComponent={
          <DrawerDialog
            title="Add User"
            btnTitle="Add User"
            description="This is an add user dialogue form"
            isOpen={isOpenAddUser}
            setIsOpen={setIsOpenAddUser}
          >
            <UserForm tokenData={tokenData} />
          </DrawerDialog>
        }
        drawalEditComponent={
          isOpenEditUser && (
            <DrawerDialog
              title="Edit User"
              btnTitle="Edit User"
              description="This is an Edit user dialogue form"
              isOpen={isOpenEditUser}
              setIsOpen={setIsOpenEditUser}
            >
              <EditUserForm tokenData={tokenData} />
            </DrawerDialog>
          )
        }
      />
    </>
  );
}
