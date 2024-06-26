import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
  description: "This is cocobod appraisal Users page",
};

import { fetchAllUsers } from "@/lib/fetchAllUsers";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserRow from "./UserRow";
import { cookies } from "next/headers";

export default async function Users() {
  const cookieStore = cookies();

  const token = cookieStore.get("token")?.value;
  const usersData = await fetchAllUsers<UsersProps>(
    "http://localhost:8000/all-users",
    token
  );

  const users = usersData.Users;

  return (
    <div className="p-8 container">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Division</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
