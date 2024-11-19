"use client";

import React, { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { DrawerDialog } from "@/components/drawable-dialog";
import { EmployeeForm } from "./employee-form";
import useColumns from "./columns";

import { useDialogToggle } from "@/store/dialogToggle";
import { EditEmployeeForm } from "./edit-employee-form";

import { useTokenDataStore } from "@/store/tokenData";

interface EmployeesPageProps {
  employees: EmployeeProps[];
  tokenData: TokenProps;
}

export default function EmployeesPage({
  employees,
  tokenData,
}: EmployeesPageProps) {
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
        data={employees}
        isOpenAddUser={toggleDialog.isOpenAddEmployee}
        isOpenEditUser={toggleDialog.isOpenEditEmployee}
        drawalDialogComponent={
          <DrawerDialog
            title="Add Employee"
            btnTitle="Add Employee"
            description="This is add Employee dialogue form"
            isOpen={toggleDialog.isOpenAddEmployee}
            setIsOpen={toggleDialog.setIsOpenAddEmployee}
          >
            <EmployeeForm tokenData={tokenData} />
          </DrawerDialog>
        }
        drawalEditComponent={
          toggleDialog.isOpenEditEmployee && (
            <DrawerDialog
              title="Edit Employee"
              btnTitle="Edit Employee"
              description="This is Edit Employee dialogue form"
              isOpen={toggleDialog.isOpenEditEmployee}
              setIsOpen={toggleDialog.setIsOpenEditEmployee}
            >
              <EditEmployeeForm tokenData={tokenData} />
            </DrawerDialog>
          )
        }
      />
    </>
  );
}
