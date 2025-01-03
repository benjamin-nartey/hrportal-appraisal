"use client";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/hooks/use-toast";

import { fetchDepartments } from "@/lib/fetchDepartments";
import { fetchRoles } from "@/lib/fetchRoles";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/MultiSelect";

import { useDialogToggle } from "@/store/dialogToggle";
import { useUserStore } from "@/store/user";

interface UserFormProps extends React.ComponentProps<"form"> {
  tokenData: TokenProps | null;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function EditEmployeeForm({ className, tokenData }: UserFormProps) {
  const { user } = useUserStore();
  const [departmentOptions, setDepartmentOptions] = useState<DepartmentProps[]>(
    []
  );
  const [roleOptions, setRoleOptions] = useState<RoleProps[]>([]);
  const [selectedRoleValue, setSelectedRoleValue] = useState<string[]>(
    user?.role.map((r) => r.id) || []
  );
  const [selectedDepartmentValue, setSelectedDepartmentValue] =
    useState<string>(user?.department.id || "");

  const { toast } = useToast();
  const { toggleDialog } = useDialogToggle();

  useEffect(() => {
    const fetchDepartmentOptions = async () => {
      try {
        const data = await fetchDepartments<DepartmentsDataProps>(
          `${BASE_URL}/department`,
          tokenData?.token
        );

        setDepartmentOptions(data.departments);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchDepartmentOptions();
  }, [tokenData?.token]);

  useEffect(() => {
    const fetchRoleOptions = async () => {
      try {
        const data = await fetchRoles<RoleDataProps>(
          `${BASE_URL}/role`,
          tokenData?.token
        );

        setRoleOptions(data.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchRoleOptions();
  }, [tokenData?.token]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const userData: CreateUserDataProps = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        departmentId: formData.get("departmentId") as string,
        roleIds: selectedRoleValue,
      };

      const response = await fetch(`${BASE_URL}/user/${user?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok && response.status === 409) {
        throw new Error(
          `username or email already exist...(${response.statusText})`
        );
      } else if (!response.ok) {
        throw new Error(
          `There was a problem with your request... (${response.statusText})`
        );
      }

      const data: CreatedUserResponseProps = await response.json();
      toast({
        title: "Success",
        description: `${data.message}`,
      });

      toggleDialog.setIsOpenEditEmployee(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error}`,
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          className="ring-transparent"
          name="name"
          id="name"
          defaultValue={user?.name}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          className="ring-transparent"
          name="email"
          type="email"
          id="email"
          defaultValue={user?.email}
          required
        />
      </div>

      <div className="w-full grid gap-2">
        <Label htmlFor="email">Department</Label>
        <Select
          onValueChange={setSelectedDepartmentValue}
          value={selectedDepartmentValue}
          defaultValue={user?.department.id}
          name="departmentId"
          required
        >
          <SelectTrigger className="w-full ring-transparent">
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              {departmentOptions?.map((option) => (
                <SelectItem
                  className="cursor-pointer"
                  key={option.id}
                  value={option.id}
                >
                  {option.departmentName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full grid gap-2">
        <Label htmlFor="email">Role</Label>

        <MultiSelector
          values={selectedRoleValue}
          onValuesChange={setSelectedRoleValue}
          loop
          className="max-w-xs bg-white"
        >
          <MultiSelectorTrigger roleOptions={roleOptions}>
            <MultiSelectorInput placeholder="" />
          </MultiSelectorTrigger>
          <MultiSelectorContent className="bg-white">
            <MultiSelectorList>
              {roleOptions?.map((option) => (
                <MultiSelectorItem key={option.id} value={option.id}>
                  {option.name}
                </MultiSelectorItem>
              ))}
            </MultiSelectorList>
          </MultiSelectorContent>
        </MultiSelector>
      </div>

      <Button className="text-white" type="submit">
        Save changes
      </Button>
    </form>
  );
}
