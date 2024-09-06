"use client";

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

export const columns: ColumnDef<UserDataProps>[] = [
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
      const department: DepartmentProps = row.getValue("department");
      const departmentName = department.departmentName;

      return <div className="capitalize">{departmentName}</div>;
    },
  },
  {
    accessorKey: "division",
    header: "Division",
    cell: ({ row }) => {
      const division: DivisionProps = row.getValue("division");
      const divisionName = division.divisionName;

      return <div className="capitalize">{divisionName}</div>;
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
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Edit User Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete User</DropdownMenuItem>
            <DropdownMenuItem>View User Info</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
