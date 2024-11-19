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

import { useDialogToggle } from "@/store/dialogToggle";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/MultiSelect";

import { DatePicker } from "@/components/datePickerCustom";

interface UserFormProps extends React.ComponentProps<"form"> {
  tokenData: TokenProps | null;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function EmployeeForm({ className, tokenData }: UserFormProps) {
  const [departmentOptions, setDepartmentOptions] = useState<DepartmentProps[]>(
    []
  );
  const [designationOptions, setDesignationOptions] = useState([]);
  const [employeeStatusOptions, setEmployeeStatusOptions] = useState([]);
  const [qualificationOptions, setQualificationOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [supervisorOptions, setSupervisorOptions] = useState([]);

  const [roleOptions, setRoleOptions] = useState<RoleProps[]>([]);

  const [selectedRoleValue, setSelectedRoleValue] = useState<string[]>([]);

  const [selectedDepartmentValue, setSelectedDepartmentValue] =
    useState<string>("");

  const [selectedDesignationValue, setSelectedDesignationValue] =
    useState<string>("");

  const [selectedEmployeeStatusValue, setSelectedEmployeeStatusValue] =
    useState<string>("");

  const [selectedQualificationValue, setSelectedQualificationValue] =
    useState<string>("");

  const [selectedLocationValue, setSelectedLocationValue] =
    useState<string>("");

  const [selectedSupervisorValue, setSelectedSupervisorValue] =
    useState<string>("");

  const { toast } = useToast();
  const { toggleDialog } = useDialogToggle();

  const [selectedDOBDate, setSelectedDOBDate] = useState<Date | undefined>(
    undefined
  );
  const [selectedDOADate, setSelectedDOADate] = useState<Date | undefined>(
    undefined
  );
  const [selectedDOLPDate, setSelectedDOLPDate] = useState<Date | undefined>(
    undefined
  );

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

      const response = await fetch(`${BASE_URL}/user`, {
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

      toggleDialog.setIsOpenAddEmployee(false);
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
      id="employee-form"
      onSubmit={handleSubmit}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          className="ring-transparent"
          name="name"
          id="name"
          placeholder="Enter Name"
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
          placeholder="Enter Email"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="staffNo">Staff ID</Label>
        <Input
          className="ring-transparent"
          name="staffNo"
          type="number"
          min={0}
          id="staffNo"
          placeholder="Enter Number"
          required
        />
      </div>

      <div className="grid gap-2">
        <legend className="text-sm font-medium">Date Of Birth</legend>
        <DatePicker onDateChange={setSelectedDOBDate} />
      </div>

      <div className="grid gap-2">
        <legend className="text-sm font-medium">Date Of Appointment</legend>
        <DatePicker onDateChange={setSelectedDOADate} />
      </div>

      <div className="grid gap-2">
        <legend className="text-sm font-medium">Date Of Last Promotion</legend>
        <DatePicker onDateChange={setSelectedDOLPDate} />
      </div>

      <div className="w-full grid gap-2">
        <legend className="text-sm font-medium"> Employee Status</legend>
        <Select
          onValueChange={setSelectedEmployeeStatusValue}
          value={selectedEmployeeStatusValue}
          name="stateOfEmployee"
          required
        >
          <SelectTrigger className="w-full ring-transparent">
            <SelectValue placeholder="Select employee status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectItem
                className="cursor-pointer hover:bg-secondary hover:text-black"
                value="ACTIVE"
              >
                ACTIVE
              </SelectItem>
              <SelectItem
                className="cursor-pointer hover:bg-secondary hover:text-black"
                value="INACTIVE"
              >
                INACTIVE
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full grid gap-2">
        <legend className="text-sm font-medium">Department</legend>
        <Select
          onValueChange={setSelectedDepartmentValue}
          value={selectedDepartmentValue}
          name="departmentId"
          required
        >
          <SelectTrigger className="w-full ring-transparent">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              {departmentOptions?.map((option) => (
                <SelectItem
                  className="cursor-pointer hover:bg-secondary hover:text-black"
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
        <legend className="text-sm font-medium">Designation</legend>
        <Select
          onValueChange={setSelectedDesignationValue}
          value={selectedDesignationValue}
          name="designationId"
          required
        >
          <SelectTrigger className="w-full ring-transparent">
            <SelectValue placeholder="Select designation" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              {departmentOptions?.map((option) => (
                <SelectItem
                  className="cursor-pointer hover:bg-secondary hover:text-black"
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
        <legend className="text-sm font-medium">Location</legend>
        <Select
          onValueChange={setSelectedLocationValue}
          value={selectedLocationValue}
          name="locationId"
          required
        >
          <SelectTrigger className="w-full ring-transparent">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              {departmentOptions?.map((option) => (
                <SelectItem
                  className="cursor-pointer hover:bg-secondary hover:text-black"
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
        <legend className="text-sm font-medium">Qualification</legend>
        <Select
          onValueChange={setSelectedQualificationValue}
          value={selectedQualificationValue}
          name="qualificationId"
          required
        >
          <SelectTrigger className="w-full ring-transparent">
            <SelectValue placeholder="Select qualification" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              {departmentOptions?.map((option) => (
                <SelectItem
                  className="cursor-pointer hover:bg-secondary hover:text-black"
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
        <legend className="text-sm font-medium">Supervisor</legend>
        <Select
          onValueChange={setSelectedSupervisorValue}
          value={selectedSupervisorValue}
          name="supervisorId"
          required
        >
          <SelectTrigger className="w-full ring-transparent">
            <SelectValue placeholder="Select supervisor" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              {departmentOptions?.map((option) => (
                <SelectItem
                  className="cursor-pointer hover:bg-secondary hover:text-black"
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

      <Button className="text-white" type="submit">
        Submit
      </Button>
    </form>
  );
}
