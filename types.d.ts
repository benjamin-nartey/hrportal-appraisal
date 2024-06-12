interface LoginProps {
  email: string;
  password: string;
}

interface DepartmentProps {
  id: string;
  departmentName: string;
  divisionId: string;
}

interface DivisionProps {
  id: string;
  divisionName: string;
}

interface EmployeeProps {
  id: string;
  staffNo: string;
  supervisorId: string | null;
}

interface PermissionDataProps {
  id: string;
  name: string;
}

interface PermissionProps {
  permission: PermissionDataProps;
}

interface RoleProps {
  id: string;
  name: string;
  rolePermissions: PermissionProps[];
}

interface UserDataProps {
  id: string;
  name: string;
  email: string;
  division: DivisionProps;
  department: DepartmentProps;
  employee: EmployeeProps;
  role: RoleProps[];
}

interface UserProps {
  User: UserDataProps;
}

interface TokenProps {
  token: string;
}
