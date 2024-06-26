"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";

type Props = {
  user: UserDataProps;
};

export default function UserRow({ user }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/users/edit/${user.id}`);
  };

  return (
    <TableRow className="hover:cursor-pointer" onClick={handleClick}>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.department.departmentName}</TableCell>
      <TableCell>{user.division.divisionName}</TableCell>
    </TableRow>
  );
}
