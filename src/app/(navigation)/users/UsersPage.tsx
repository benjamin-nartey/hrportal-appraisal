"use client";

import React, { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { DrawerDialog } from "@/components/drawable-dialog";
import { UserForm } from "./user-form";
import useColumns from "./columns";

import { useDialogToggle } from "@/store/dialogToggle";
import { EditUserForm } from "./edit-user-form";

import { useTokenDataStore } from "@/store/tokenData";

interface UsersPageProps {
  users: UserDataProps[];
  tokenData: AccessTokenProps;
}

export default function UsersPage({ users, tokenData }: UsersPageProps) {
  const columns = useColumns();

  const { toggleDialog } = useDialogToggle();

  const { updateTokenData } = useTokenDataStore();

  useEffect(() => {
    updateTokenData(tokenData);
  }, [tokenData, updateTokenData]);

  return (
    <>
      <DataTable
        columns={columns}
        data={users}
        isOpenAddUser={toggleDialog.isOpenAddUser}
        isOpenEditUser={toggleDialog.isOpenEditUser}
        drawalDialogComponent={
          <DrawerDialog
            title="Add User"
            btnTitle="Add User"
            description="This is an add user dialogue form"
            isOpen={toggleDialog.isOpenAddUser}
            setIsOpen={toggleDialog.setIsOpenAddUser}
          >
            <UserForm tokenData={tokenData} />
          </DrawerDialog>
        }
        drawalEditComponent={
          toggleDialog.isOpenEditUser && (
            <DrawerDialog
              title="Edit User"
              btnTitle="Edit User"
              description="This is an Edit user dialogue form"
              isOpen={toggleDialog.isOpenEditUser}
              setIsOpen={toggleDialog.setIsOpenEditUser}
            >
              <EditUserForm tokenData={tokenData} />
            </DrawerDialog>
          )
        }
      />
    </>
  );
}
