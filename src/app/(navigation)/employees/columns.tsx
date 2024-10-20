"use client";

import React, { useState } from "react";
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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useUserStore } from "@/store/user";
import { useDialogToggle } from "@/store/dialogToggle";
import { useTokenDataStore } from "@/store/tokenData";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/formatDate";

const useColumns = (): ColumnDef<EmployeeProps>[] => {
  const { updateUser } = useUserStore();
  const { toggleDialog } = useDialogToggle();
  const [isOpenDeleteAlert, setisOpenDeleteAlert] = useState(false);
  const { tokenData } = useTokenDataStore();
  const { toast } = useToast();

  const router = useRouter();

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
          className="text-white"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="text-white"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "user",
      header: "Name",
      cell: ({ row }) => {
        const user = row.getValue("user") as {
          id: string;
          name: string;
          email: string;
          division: {
            id: string;
            divisionName: string;
          };
        };

        return <div className="capitalize">{user.name}</div>;
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const user = row.getValue("user") as {
          id: string;
          name: string;
          email: string;
          division: {
            id: string;
            divisionName: string;
          };
        };

        return <div className="capitalize">{user.email}</div>;
      },
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => {
        const department = row.getValue("department") as {
          departmentName: string;
        };
        return <div className="capitalize">{department?.departmentName}</div>;
      },
    },
    {
      accessorKey: "division",
      header: "Division",
      cell: ({ row }) => {
        const user = row.getValue("user") as {
          id: string;
          name: string;
          email: string;
          division: {
            id: string;
            divisionName: string;
          };
        };

        return <div className="capitalize">{user.division.divisionName}</div>;
      },
    },
    {
      accessorKey: "staffNo",
      header: "Staff ID",
    },
    {
      accessorKey: "supervisor",
      header: "Supervisor's Name",
      cell: ({ row }) => {
        const supervisor = row.getValue("supervisor") as {
          id: string;
          user: {
            name: string;
          };
        };

        return <div className="capitalize">{supervisor.user.name}</div>;
      },
    },
    {
      accessorKey: "designation",
      header: "Designation",
      cell: ({ row }) => {
        const designation = row.getValue("designation") as {
          id: string;
          name: string;
        };

        return <div className="capitalize">{designation.name}</div>;
      },
    },
    {
      accessorKey: "qualification",
      header: "Qualification",
      cell: ({ row }) => {
        const qualification = row.getValue("qualification") as {
          id: string;
          name: string;
        };

        return <div className="capitalize">{qualification.name}</div>;
      },
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date Of Birth",
      cell: ({ row }) => {
        const dateOfBirth = row.getValue("dateOfBirth") as string;

        return <div className="capitalize">{formatDate(dateOfBirth)}</div>;
      },
    },
    {
      accessorKey: "dateOfAppointment",
      header: "Date Of First Appointment",
      cell: ({ row }) => {
        const dateOfAppointment = row.getValue("dateOfAppointment") as string;

        return (
          <div className="capitalize">{formatDate(dateOfAppointment)}</div>
        );
      },
    },
    {
      accessorKey: "dateOfLastPromotion",
      header: "Date Of Last Promotion",
      cell: ({ row }) => {
        const dateOfLastPromotion = row.getValue(
          "dateOfLastPromotion"
        ) as string;

        return (
          <div className="capitalize">{formatDate(dateOfLastPromotion)}</div>
        );
      },
    },
    { accessorKey: "stateOfEmployee", header: "STATUS" },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => {
        const location = row.getValue("location") as {
          id: string;
          name: string;
        };

        return <div className="capitalize">{location.name}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const employee = row.original;
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

        const handleDelete = async () => {
          try {
            const response = await fetch(`${BASE_URL}/user/${employee.id}`, {
              method: "DELETE",
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenData?.token}`,
              },
            });

            if (!response.ok) {
              throw new Error("Error occured while trying to delete user");
            }

            toast({
              title: "Success",
              description: "User deleted successfully",
            });
            router.refresh();
          } catch (error) {
            toast({
              title: "Uh oh! Something went wrong.",
              description: `${error}`,
              variant: "destructive",
            });
          }
        };

        return (
          <>
            <AlertDialog open={isOpenDeleteAlert}>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => setisOpenDeleteAlert(false)}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="text-white"
                    onClick={() => {
                      // handleDelete();
                      setisOpenDeleteAlert(false);
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

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
                    // updateUser(user);
                    toggleDialog.setIsOpenEditEmployee(true);
                  }}
                >
                  Edit User
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="hover:bg-slate-300 cursor-pointer"
                  onClick={() => setisOpenDeleteAlert(true)}
                >
                  Delete User
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-slate-300 cursor-pointer">
                  View User Info
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];
};

export default useColumns;
