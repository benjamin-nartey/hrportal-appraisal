"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useUserStore } from "@/store/user";
import { useDialogToggleEditUser } from "@/store/dialogToggleEditUser";

const useColumns = (): ColumnDef<UserDataProps>[] => {
  const { user, updateUser } = useUserStore();
  const { setIsOpenEditUser } = useDialogToggleEditUser();

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=""
          >
            <h1 className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              EMAIL
            </h1>
            <ArrowUpDown className="ml-2 h-4 w-4 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" />
          </Button>
        );
      },
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => {
        const department = row.getValue("department") as {
          departmentName: string;
        };
        return <div className="capitalize">{department.departmentName}</div>;
      },
    },
    {
      accessorKey: "division",
      header: "Division",
      cell: ({ row }) => {
        const division = row.getValue("division") as { divisionName: string };
        return <div className="capitalize">{division.divisionName}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black" align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="hover:bg-slate-300 cursor-pointer"
                onClick={() => {
                  updateUser(user);
                  setIsOpenEditUser(true);
                }}
              >
                Edit User
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-slate-300 cursor-pointer">
                Delete User
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-300 cursor-pointer">
                View User Info
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};

export default useColumns;
