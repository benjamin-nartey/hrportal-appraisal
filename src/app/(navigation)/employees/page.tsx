export const dynamic = "force-dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employees",
};

import { refreshTokenAndFetchAllUsers } from "@/lib/refreshTokenAndFetchUsers";

import EmployeesPage from "./EmployeesPage";
import { fetchAllEmployees } from "@/lib/fetchAllEmployees";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function Employees() {
  const { tokenData } = await refreshTokenAndFetchAllUsers();

  const employeesData = await fetchAllEmployees<AllEmployeesProps>(
    `${BASE_URL}/employee`,
    `${tokenData.token}`
  );

  return (
    <div className="container mx-auto lg:p-12 p-2">
      <EmployeesPage
        employees={employeesData.Employees}
        tokenData={tokenData}
      />
    </div>
  );
}
